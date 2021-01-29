import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";

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
    const field_value = getProp(data, field);

    //case 1  <line 85>
    if (!rule && !data) {
    }

    //<line 120>
    if (!field_value) {
      return res.status(400).json({
        message: `field ${field} is missing from data.`,
        status: "error",
        data: null,
      });
    }
    // Check if Field value & Condition Value are of the same type here <line 98>
    if (typeof field_value !== typeof condition_value) {
      return res.status(400).json({
        message: `${field} should be a|an ${typeof condition_value}.`,
        status: "error",
        data: null,
      });
    }

    let notError;
    try {
      switch (condition) {
        case "eq":
          notError = field_value === condition_value;
          break;
        case "neq":
          notError = field_value !== condition_value;
          break;
        case "gt":
          notError = field_value > condition_value;
          break;
        case "gte":
          notError = field_value >= condition_value;
          break;
        case "contains":
          notError = field_value.includes(condition_value);
          break;
        default:
          notError = false;
          break;
      }
    } catch (error) {
      // Handle Errors
    }

    if (notError) {
      return res.status(200).json({
        message: `field ${field} successfully validated.`,
        status: "success",
        data: {
          validation: {
            error: false,
            field,
            field_value,
            condition,
            condition_value,
          },
        },
      });
    } else {
      return res.status(400).json({
        message: `field ${field} failed validation.`,
        status: "error",
        data: {
          validation: {
            error: true,
            field,
            field_value,
            condition,
            condition_value,
          },
        },
      });
    }
  };
}

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
function getProp(obj: any, prop: string) {
  if (typeof obj !== "object") throw "getProp: obj is not an object";
  if (typeof prop !== "string") throw "getProp: prop is not a string";
  // Replace [] notation with dot notation
  prop = prop.replace(/\[["'`](.*)["'`]\]/g, ".$1");
  return prop.split(".").reduce(function (prev, curr) {
    return prev ? prev[curr] : undefined;
  }, obj || self);
}

export default ValidatorController;
