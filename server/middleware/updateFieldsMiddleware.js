export const updateModifiedFields = function (schema) {
    // This middleware runs before saving a document to update modifiedAt and modifiedBy
    schema.pre('save', function (next) {
      this.modifiedAt = Date.now();
      // Set modifiedBy field, for example, from request context (or set it manually before saving)
      // this.modifiedBy = // set modifiedBy, for instance, req.user._id (assuming user is logged in)
      next();
    });
};
  