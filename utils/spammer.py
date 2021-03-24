from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Callable

import concurrent
import json
import requests
import sys
import time

PROD_API_URL: str = 'https://api.hellotangle.io/api'
DEV_API_URL: str = 'http://localhost:3000/api'

MESSAGE: dict = {
    'content': 'Hello, Tangle!',
    'recipient_address': 'HZYKLMOYJYAYBYRTKAQPUOMUSZTC999JDJCVTXRKOS9WEHR9QEYOBFJRHVXGXJ9CEZPEPIDLVOBBDDCNJXML9GHCYB'
}

MESSAGE_COUNT = 9
NUM_WORKERS = 3

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

def create_url(path: str) -> str:
    return f'{DEV_API_URL}/{path}'

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
    return requests.post(create_url('messages/send'), msgData).json()

def initialize_spammer_parameters() -> bool:
    global MESSAGE_COUNT
    global NUM_WORKERS

    message_count_error = 'Invalid parameter for argument: MESSAGE_COUNT\nIt must an integer in the range [1, 1_000_000].'
    num_workers_error = '\nInvalid parameter for argument: NUM_WORKERS\nIt must be an integer in the range [1, 1000].'

    was_exception_thrown = False

    try:
        MESSAGE_COUNT = int(sys.argv[1])

        assert(type(MESSAGE_COUNT) is int)
        assert(MESSAGE_COUNT > 0 and MESSAGE_COUNT <= 1_000_000)

    except Exception as e:
        print_message(message_count_error)
        was_exception_thrown = True

    try:
        NUM_WORKERS = int(sys.argv[2])

        assert(type(NUM_WORKERS) is int)
        assert(NUM_WORKERS > 0 and NUM_WORKERS <= 1_000)
        assert(NUM_WORKERS <= MESSAGE_COUNT)

    except Exception as e:
        print_message(num_workers_error)
        was_exception_thrown = True

    return not was_exception_thrown

def begin_spamming() -> None:
    global MESSAGE_COUNT
    global NUM_WORKERS

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

        done_msg: str = f'Finished!'
        message_count_msg: str = f'Broadcasted {MESSAGE_COUNT} message(s)'
        num_workers_msg: str = f'with {NUM_WORKERS} worker(s).'

        print_message(f'\n{done_msg} {message_count_msg} {num_workers_msg}')

        break

@TimeFn
def spam() -> None:
    num_args = len(sys.argv)
    assert(num_args == 3)

    if initialize_spammer_parameters():
        begin_spamming()

def main() -> None:
    spam()

if __name__ == '__main__':
    main()
