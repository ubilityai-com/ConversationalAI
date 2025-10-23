# logger_config.py
import logging
import os
from logging.handlers import TimedRotatingFileHandler

def setup_logger():
    # Create logs directory if not exists
    log_dir = "./logs"
    os.makedirs(log_dir, exist_ok=True)

    # Setup rotating log handler
    handler = TimedRotatingFileHandler(
        filename=os.path.join(log_dir, "ubility_bot.log"),
        encoding='utf-8',
        when="midnight",
        interval=1
    )
    handler.suffix = "%Y-%m-%d"

    logging.basicConfig(
        handlers=[handler],
        format="%(asctime)s %(name)s:%(levelname)s:%(message)s",
        datefmt="%F %A %T",
        level=logging.INFO
    )

# Create a module-level logger that can be imported anywhere
logger = logging.getLogger(__name__)