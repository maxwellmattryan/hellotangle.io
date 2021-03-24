from typing import Callable

import json
import requests
import time

# API_URL: str = 'https://api.hellotangle.io/api'
API_URL: str = 'http://localhost:3000/api'
MESSAGE: dict = {
    'content': 'Hello, Tangle!',
    'recipient_address': 'HZYKLMOYJYAYBYRTKAQPUOMUSZTC999JDJCVTXRKOS9WEHR9QEYOBFJRHVXGXJ9CEZPEPIDLVOBBDDCNJXML9GHCYB'
}
MESSAGE_COUNT: int = 100

def TimeFn(fn: Callable) -> None:
    def wrapper(*args, **kwargs):
        time_start = time.time()
        result = fn(*args, **kwargs)
        time_end = time.time()

        msg: str = f'{fn.__name__} > {(time_end - time_start) * 1000:2.2f} ms'
        print_message(msg)

        return result

    return wrapper

def create_url(path: str) -> str:
    return f'{API_URL}/{path}'

def print_message_dict(msg: dict) -> None:
    parsed = json.loads(json.dumps(msg))
    print(f'{json.dumps(parsed, indent = 4, sort_keys = True)}')

def print_message(msg: dict or str) -> None:
    if type(msg) is dict:
        print_message_dict(msg)
    else:
        print(f'{msg}')

@TimeFn
def send_message(msgData: dict) -> dict:
    return requests.post(create_url('messages/send'), msgData).json()

@TimeFn
def spam() -> None:
    print(f'SPAMMING...')
    for i in range(MESSAGE_COUNT):
        print_message(f'\n{i:03}')

        msg: dict = send_message(MESSAGE)
        print_message(msg)

def main() -> None:
    spam()

if __name__ == '__main__':
    main()
