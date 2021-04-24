const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
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

  app.put("/api/workout/:id", (req, res) => {
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

  app.post("/api/workout", (req, res) => {
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

  app.get("/api/workout/range", (req, res) => {
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
