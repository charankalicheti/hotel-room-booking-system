import re


def validate_name(name: str):
    """
    Validate customer name.
    """

    if len(name.strip()) < 3:
        raise ValueError(
            "Name must contain at least 3 characters."
        )

    if not re.fullmatch(r"[A-Za-z ]+", name):
        raise ValueError(
            "Name should contain only alphabets."
        )

    return True
