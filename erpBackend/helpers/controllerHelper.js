exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({
        status: "failed",
        message: "no document found at that id",
      });
    }
    res.status(204).json({
      status: "sucess",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).json({
        status: "failed",
        message: "no document found at that id",
      });
    }

    res.status(200).json({
      status: "sucess",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.createOne = (Model) => async (req, res, next) => {
  const doc = await Model.create({ ...req.body, createdOn: Date.now() });

  res.status(201).json({
    status: "sucesss",
    data: {
      data: doc,
    },
  });
};

exports.getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);
    if (query) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return res.status(404).json({
        status: "failed",
        message: "no document foundat that id",
      });
    }

    res.status(200).json({
      status: "sucess",

      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getAll = (Model, filter = {}) => async (req, res, next) => {
  try {
    const docs = await Model.find(filter);

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      result: docs.length,
      data: {
        docs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};
