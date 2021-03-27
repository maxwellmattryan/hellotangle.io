from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Callable

import concurrent
import json
import requests
import socket
import sys
import time

# Required script arguments
MESSAGE_COUNT: int = 5
NUM_WORKERS: int = 2
API_ENVIRONMENT: str = 'dev'

# NOTE: The producation environment is rate limited to 100 requests per 1 minute.
API_HOST: str = 'localhost'
API_PORT: int = 3000
API_URL: str = f'http://{API_HOST}:{API_PORT}/api'

# Basic message to use in spamming the API and IOTA Tangle.
MESSAGE: dict = {
    'content': 'Hello, Tangle!',
    'recipient_address': 'HZYKLMOYJYAYBYRTKAQPUOMUSZTC999JDJCVTXRKOS9WEHR9QEYOBFJRHVXGXJ9CEZPEPIDLVOBBDDCNJXML9GHCYB'
}

def TimeFn(fn: Callable) -> None:
    def wrapper(*args, **kwargs):
        time_start = time.time()
        result = fn(*args, **kwargs)
        time_end = time.time()

        function_msg: str = f'\nFunction: {fn.__name__}'
        timing_msg: str = f'\nTime: {(time_end - time_start) * 1000:2.2f} ms'
        if type(result) is dict:
            data_msg: str = f'\nData:\n{prettify_json(result)}'
        elif result is None:
            data_msg: str = f''
        else:
            data_msg: str = f'\nData:\n{result}'

        print_message(f'{function_msg}{timing_msg}{data_msg}')

        return result

    return wrapper

def is_open(ip: str, port: int or str) -> bool:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        s.connect((ip, port))
        s.shutdown(2)

        return True

    except:
        print_message(f'[Error]: Unable to connect to {ip}:{port}.')

        return False

def create_url(path: str) -> str:
    global API_URL

    return f'{API_URL}/{path}'

def prettify_json(data: dict) -> str:
    return json.dumps(data, indent = 4, sort_keys = True)

def print_message_dict(msg: dict) -> None:
    print(prettify_json(msg))

def print_message(msg: dict or str) -> None:
    if type(msg) is dict:
        print_message_dict(msg)
    else:
        print(msg)

@TimeFn
def send_message(msgData: dict) -> dict:
    data: dict = requests.post(create_url('messages/send'), msgData).json()

    return data

def initialize_spammer_parameters() -> bool:
    global MESSAGE_COUNT
    global NUM_WORKERS
    global API_ENVIRONMENT
    global API_URL

    message_count_error = 'Invalid parameter for argument: MESSAGE_COUNT\nIt must an integer in the range [1, 10000].'
    num_workers_error = '\nInvalid parameter for argument: NUM_WORKERS\nIt must be an integer in the range [1, 1000] and less than or equal to MESSAGE_COUNT.'
    api_environment_error = '\nInvalid parameter for argument: API_ENVIRONMENT\nIt must be either "dev" or "prod".'

    was_exception_thrown = False

    try:
        MESSAGE_COUNT = int(sys.argv[1])

        assert(type(MESSAGE_COUNT) is int)
        assert(MESSAGE_COUNT > 0 and MESSAGE_COUNT <= 10000)

    except Exception as e:
        print_message(message_count_error)
        was_exception_thrown = True

    try:
        NUM_WORKERS = int(sys.argv[2])

        assert(type(NUM_WORKERS) is int)
        assert(NUM_WORKERS > 0 and NUM_WORKERS <= 1000)
        assert(NUM_WORKERS <= MESSAGE_COUNT)

    except Exception as e:
        print_message(num_workers_error)
        was_exception_thrown = True

    try:
        API_ENVIRONMENT = str(sys.argv[3])

        if type(API_ENVIRONMENT) is not None:

            assert(type(API_ENVIRONMENT) is str)
            assert(API_ENVIRONMENT == 'dev' or API_ENVIRONMENT == 'prod')

            if API_ENVIRONMENT == 'prod':
                API_URL = f'https://api.hellotangle.io/api'

    except Exception as e:
        print_message(api_environment_error)
        was_exception_thrown = True

    return not was_exception_thrown

def begin_spamming() -> None:
    global MESSAGE_COUNT
    global NUM_WORKERS

    time_start = time.time()

    while(True):
        try:
            print_message('Beginning the spam!')

            with ThreadPoolExecutor(max_workers = NUM_WORKERS) as executor:
                res = [executor.submit(send_message, MESSAGE) for _ in range(MESSAGE_COUNT)]
                concurrent.futures.wait(res)

        except UnboundLocalError as ule:
            print_message(f'\n[Error]: {ule}')
            continue
        except Exception as e:
            print_message(f'\n[Error]: {e}')
            continue

        time_end = time.time()
        time_in_seconds = (time_end - time_start) % 60

        done_msg: str = f'Finished!'
        message_count_msg: str = f'Spammed {MESSAGE_COUNT} message request(s)'
        num_workers_msg: str = f'with {NUM_WORKERS} worker(s)'
        message_rate_msg: str = f'at {(MESSAGE_COUNT / time_in_seconds):.02f} msg(s) per second.'

        print_message(f'\n{done_msg} {message_count_msg} {num_workers_msg} {message_rate_msg}')

        break

@TimeFn
def spam() -> None:
    begin_spamming()

def main() -> None:
    num_args = len(sys.argv)
    assert(num_args == 4)

    if not initialize_spammer_parameters():
        return

    if API_ENVIRONMENT == 'prod':
        spam()
    elif is_open(API_HOST, API_PORT):
        spam()

if __name__ == '__main__':
    main()
