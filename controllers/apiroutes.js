const db = require("../models");

module.exports = (app) => {
  app.get("/api/workout", (req, res) => {
    db.workout.aggregate([
      {
        $sort: {
          day: -1,
        },
      },
      { $limit: 7 },
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .then((dbworkout) => {
        dbworkout.reverse();
        res.json(dbworkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    db.workout.findByIdAndUpdate(req.params.id, {
      $push: {
        exercises: req.body,
      },
    })
      .then((dbworkout) => {
        res.json(dbworkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/api/workouts", (req, res) => {
    console.log(req.body);
    db.workout.create(req.body)
      .then((dbworkout) => {
        console.log(dbworkout);
        res.json(dbworkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.workout.aggregate([
      {
        $sort: {
          day: -1,
        },
      },
      { $limit: 7 },
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .then((dbworkout) => {
        dbworkout.reverse();
        res.json(dbworkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
