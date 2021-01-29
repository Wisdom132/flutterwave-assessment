const body = {
  rule: {
    field: "missions.count",
    condition: "gte",
    condition_value: 30,
  },
  data: {
    name: "James Holden",
    crew: "Rocinante",
    age: 34,
    position: "Captain",
    missions: {
      count: 45,
      successful: 44,
      failed: 1,
    },
  },
};

const { condition, condition_value, field } = body.rule;

const field_value = getProp(body.data, field);
// If field value is undefined handle line 120

// Check if Field value & Condition Value are of the same type here line 98

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

let response;
if (notError) {
  response = {
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
  };
} else {
  response = {
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
  };
}

console.log(response);

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
function getProp(obj, prop) {
  if (typeof obj !== "object") throw "getProp: obj is not an object";
  if (typeof prop !== "string") throw "getProp: prop is not a string";

  // Replace [] notation with dot notation
  prop = prop.replace(/\[["'`](.*)["'`]\]/g, ".$1");

  return prop.split(".").reduce(function (prev, curr) {
    return prev ? prev[curr] : undefined;
  }, obj || self);
}
