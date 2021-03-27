#!/bin/bash

convertsecs() {
    ((m = (${1} % 3600) / 60))
    ((s = ${1} % 60))
    printf "%02dm %02ds\n" $m $s
}

NODE_VERSION=15.12.0-alpine3.10

API_IMAGE=hellotangle-api
WEB_IMAGE=hellotangle-web
DOMAIN=hellotangle.io

GCP_HOSTNAME=gcr.io
GCP_PLATFORM=managed
GCP_PROJECT_ID=hellotangle
GCP_VPC_CONNECTOR=hellotangle-api
GCP_VPC_EGRESS=private-ranges-only
GCP_SERVICE_ACCOUNT=gcloud-api@hellotangle.iam.gserviceaccount.com
GCP_AUTH_KEY_FILE=./conf/gcloud/gcloud-api.json
GCP_API_SERVICE=hellotangle-api
GCP_WEB_SERVICE=hellotangle-web
GCP_API_IMAGE_PATH="$GCP_HOSTNAME/$GCP_PROJECT_ID/$API_IMAGE"
GCP_WEB_IMAGE_PATH="$GCP_HOSTNAME/$GCP_PROJECT_ID/$WEB_IMAGE"

API_ACTION=false
WEB_ACTION=false
for i in "$@"; do
    case $i in
    -a|--api)
        API_ACTION=true
        shift
        ;;
    -w|--web)
        WEB_ACTION=true
        shift
        ;;
    esac
done

START=1
if [ "$API_ACTION" = true ] && [ "$WEB_ACTION" = true ]
then
    STEPS=12
else
    if [ "$API_ACTION" = false ] && [ "$WEB_ACTION" = false ]
    then
        API_ACTION=true
        WEB_ACTION=true

        STEPS=12
    else
        STEPS=7
    fi
fi

start_time=$(date +%s)

echo -e "\n($START/$STEPS) Initiating pre-build checks...\n"
START=2

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "develop" ]
then
    echo -e "\t[✘] Branch is set to \"develop\"\n"
    echo -e "To switch to the correct branch, please use:\n\n\tgit checkout develop\n"

#    exit 1; remove newline @ 64
else
    echo -e "\t[✔] Branch is set to \"develop\""
fi

CURRENT_GCP_ACCOUNT=$(gcloud config list account --format "value(core.account)")
if [ "$CURRENT_GCP_ACCOUNT" != "$GCP_SERVICE_ACCOUNT" ]
then
    echo -e "\t[✘] Cloud IAM service account is set to $GCP_SERVICE_ACCOUNT\n"
    echo -e "To properly set and authenticate the service account for this project, use:\n\n\tgcloud config set account $GCP_SERVICE_ACCOUNT"
    echo -e "and"
    echo -e "\tgcloud auth activate-service-account $GCP_SERVICE_ACCOUNT --key-file=$GCP_AUTH_KEY_FILE"

    exit 1;
else
    echo -e "\t[✔] Cloud IAM service account is set to $GCP_SERVICE_ACCOUNT"
fi

CURRENT_GCP_PROJECT=$(gcloud config get-value project)
if [ "$CURRENT_GCP_PROJECT" != "$GCP_PROJECT_ID" ]
then
    echo -e "\t[✘] Cloud SDK's configuration is set for $GCP_PROJECT_ID\n"
    echo -e "To properly configure the SDK for this project, use:\n\n\tgcloud config set project $GCP_PROJECT_ID"

    exit 1;
else
    echo -e "\t[✔] Cloud SDK's configuration is set for $GCP_PROJECT_ID"
fi

if [ "$API_ACTION" = true ]
then
    cd api/ || echo -e "[Error]: API folder does not exist" | exit
    if ! npm test > /dev/null 2>&1
    then
        VALID=false
    else
        VALID=true
    fi

    if [ "$VALID" = true ] && [ "$API_ACTION" = true ];
    then
        echo -e "\t[✔] API tests passed"
    else
        echo -e "\t[✘] API tests passed"
        echo -e "To see more details about the errors in the tests, use:\n\n\tcd api/ && npm test"

        cd ../
        exit 1;
    fi
    cd ../
fi

echo -e "\n[Success]: Pre-build checks passed!\n"

if [ "$API_ACTION" = true ]
then
    cd api/ || echo -e "[Error]: API folder does not exist" | exit

    echo -e "($(expr $START)/$STEPS) Building local API image...\n"
    docker build . --no-cache --tag "$API_IMAGE"
    echo -e "[Success]: Built local API image!\n"

    echo -e "($(expr $START + 1)/$STEPS) Tagging local API image for Container Registry..."
    docker tag "$API_IMAGE" "$GCP_API_IMAGE_PATH"
    echo -e "[Success]: Tagged local API image!\n"

    echo -e "($(expr $START + 2)/$STEPS) Pushing local API image to Container Registry...\n"
    docker push "$GCP_API_IMAGE_PATH"
    echo -e "[Success]: Pushed local API image!\n"

    echo -e "($(expr $START + 3)/$STEPS) Deploying to Cloud Run service ($GCP_API_SERVICE)...\n"
    gcloud run deploy "$GCP_API_SERVICE" --image="$GCP_API_IMAGE_PATH" --platform="$GCP_PLATFORM" --vpc-connector="$GCP_VPC_CONNECTOR" --vpc-egress="$GCP_VPC_EGRESS"
    echo -e "[Success]: Deployed service!\n"

    echo -e "($(expr $START + 4)/$STEPS) Removing API images from Docker...\n"
    docker rmi "$API_IMAGE:latest"
    docker rmi "$GCP_API_IMAGE_PATH:latest"
    echo -e "[Success]: Removed API image(s)!\n"

    START=7

    cd ../
fi

if [ "$WEB_ACTION" = true ]
then
    cd web/ || echo -e "[Error]: web folder does not exist" | exit

    echo -e "($(expr $START)/$STEPS) Building local web image...\n"
    docker build . --no-cache --tag "$WEB_IMAGE"
    echo -e "[Success]: Built local web image!\n"

    echo -e "($(expr $START + 1)/$STEPS) Tagging local web image for Container Registry..."
    docker tag "$WEB_IMAGE" "$GCP_WEB_IMAGE_PATH"
    echo -e "[Success]: Tagged local web image!\n"

    echo -e "($(expr $START + 2)/$STEPS) Pushing local web image to Container Registry...\n"
    docker push "$GCP_WEB_IMAGE_PATH"
    echo -e "[Success]: Pushed local web image!\n"

    echo -e "($(expr $START + 3)/$STEPS) Deploying to Cloud Run service ($GCP_WEB_SERVICE)...\n"
    gcloud run deploy "$GCP_WEB_SERVICE" --image="$GCP_WEB_IMAGE_PATH" --platform="$GCP_PLATFORM" --region="$GCP_REGION"
    echo -e "[Success]: Deployed service!\n"

    echo -e "($(expr $START + 4)/$STEPS) Removing web images from Docker...\n"
    docker rmi "$WEB_IMAGE:latest"
    docker rmi "$GCP_WEB_IMAGE_PATH:latest"
    echo -e "[Success]: Removed web image(s)!\n"

    if [ "$STEPS" = 12 ]
    then
        START=12
    else
        START=7
    fi

    cd ../
fi

echo -e "($(expr $START)/$STEPS) Cleaning up dangling / unused images...\n"
docker rmi "node:$NODE_VERSION"
printf 'y\n' | docker image prune
echo -e "[Success]: Cleaned up images!\n"

end_time=$(date +%s)
execution_time=$(expr $end_time - $start_time)
echo -e "Total build and deployment time elapsed: $(convertsecs $execution_time)\n"

echo -e "COMPLETE! Check it out at https://$DOMAIN/"
