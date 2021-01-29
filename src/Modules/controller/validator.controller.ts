import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";

/**
 * Source: https://it.knightnet.org.uk/kb/node-js/get-properties/
 *
 * Get a nested property from an object without returning any errors.
 * If the property or property chain doesn't exist, undefined is returned.
 * Property names with spaces may use either dot or bracket "[]" notation.
 * Note that bracketed property names without surrounding quotes will fail the lookup.
 *      e.g. embedded variables are not supported.
 * @param {object} obj The object to check
 * @param {string} prop The property or property chain to get (e.g. obj.prop1.prop1a or obj['prop1'].prop2)
 * @returns {*|undefined} The value of the objects property or undefined if the property doesn't exist
 */
function getProp(obj: any, prop: any) {
  if (typeof obj !== "object") throw "getProp: obj is not an object";
  if (typeof prop !== "string") throw "getProp: prop is not a string";

  // Replace [] notation with dot notation
  prop = prop.replace(/\[["'`](.*)["'`]\]/g, ".$1");

  return prop.split(".").reduce(function (prev: any, curr: any) {
    return prev ? prev[curr] : undefined;
  }, obj || self);
}

class ValidatorController implements Controller {
  public path = "/validate-rule";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.ruleValidator);
  }

  private ruleValidator = async (req: Request, res: Response) => {
    const { rule, data } = req.body;
    const { field, condition, condition_value } = rule;

    //case 1
    if (!rule && data) {
    }

    const field_value = getProp(data, field);

    //# conditions
    //- Check if data and rule is passed
    //- Check if rule is object
    //- check if data payload is valid
    //- check if the field specified in the rule object is present in the data payload
    // - check if rule is successfully validated
    // check if the validation fails
    //

    // console.log(rule, data);
  };
}

export default ValidatorController;
