const SYM_CREATED_AT = Symbol("createdAt");
const SYM_SOURCE = Symbol("source");
const SYM_VERSION = Symbol("version");

product[SYM_CREATED_AT] = new Date().toISOString();
product[SYM_SOURCE] = "DataForge-v1";
product[SYM_VERSION] = "1.0.0";

const SYM_PIPELINE = Symbol.for("dataforge.pipeline");
const SYM_PIPELINE_REF = Symbol.for("dataforge.pipeline");

console.log(SYM_PIPELINE === SYM_PIPELINE_REF); // true — same symbol from global registry
console.log(Symbol("test") === Symbol("test")); // false — always unique