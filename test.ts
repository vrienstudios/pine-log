import Logger from "./index";
const logger = new Logger();

logger.debug("hello");
logger.debug({
    a: "b",
    c: "d",
});
logger.info("hello info");
logger.warn("warning");
logger.error("oopsie");
logger.fatal("big oopsie");
