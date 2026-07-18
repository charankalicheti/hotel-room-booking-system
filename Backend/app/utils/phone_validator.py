import re


def validate_phone(phone: str):
    """
    Validate Indian mobile number.
    """

    if not re.fullmatch(r"[6-9]\d{9}", phone):
        raise ValueError(
            "Enter a valid 10-digit mobile number."
        )

    return True