const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const Course = require("../models/courseModel");
const { faculties, locations } = require("../config/configurations");
const { log } = require("console");

//@desc Get All Sessions
//@route GET api/sessions
//@access public

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find();
  res.status(200).json({ sessions });
});

//@desc get a particular session
//@route get api/session
//@access public
const getSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(404);
    console.log("Session not found!");
    throw new Error("Session not found!");
  }
  res.status(200).json(session);
});


//@desc create a new Session
//@route post api/sessions
//@access public
const workingHoursPerDay = 8;
const createSession = asyncHandler(async (req, res) => {
  try {
    const { courseId, requiredHours, locationId } = req.body;
    const workingHoursPerDay = 8;

    const days = Math.ceil(requiredHours / workingHoursPerDay);
    const hours = requiredHours % workingHoursPerDay;


    const nextSlot = await findNextAvailableSlot(courseId, days);

    if (!nextSlot) {
      return res.status(400).json({ error: 'No available slots found for the course' });
    }


    const startTime = nextSlot;
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + hours);


    const session = new Session({
      courseId,
      startTime,
      endTime,
      locationId
    });

    await session.save();

    res.status(201).json({ message: 'Session created successfully', session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


async function findNextAvailableSlot(courseId, days) {
  const today = new Date();
  let currentDay = today.getDay();


  const startingHour = 8;
  let nextSlotStart = new Date(today);
  nextSlotStart.setDate(today.getDate() + (days - 1));
  nextSlotStart.setHours(startingHour, 0, 0, 0);


  while (days > 0) {

    if (currentDay >= 1 && currentDay <= 5) {


      const existingSession = await Session.findOne({
        courseId,
        startTime: { $gte: nextSlotStart },
        endTime: { $lt: new Date(nextSlotStart).setHours(startingHour + workingHoursPerDay) }
      });

      if (!existingSession) {
        return nextSlotStart;
      }

      days--;
    }


    currentDay = (currentDay + 1) % 7;
    nextSlotStart.setDate(nextSlotStart.getDate() + 1);
  }

  return null;
}


/*
     // Filter out overlapping sessions
     {
         $project: {
             _id: 0,
             dayOfWeek: "$_id",
             sessions: {
                 $reduce: {
                     input: "$sessions",
                     initialValue: [],
                     in: {
                         $cond: {
                             if: {
                                 $or: [
                                     { $eq: [{ $size: "$$this" }, 0] }, // If accumulator is empty
                                     {
                                         $not: {
                                             $gt: [
                                                 { $max: "$$this.startTime" }, // If current session starts after accumulator's last session ends
                                                 { $min: { $map: { input: "$value", as: "val", in: "$$val.endTime" } } }
                                             ]
                                         }
                                     }
                                 ]
                             },
                             then: "$$value",
                             else: { $concatArrays: ["$$value", ["$$this"]] } // Add current session to accumulator
                         }
                     }
                 }
             }
         }
     },
*/

//@desc update a session
//@route put api/sessions
//@access public
const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(404);
    throw new Error("session not found!");
  }
  const updateSession = await Session.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateSession);
});

//@desc delete  a session
//@route delete api/session
//@access public
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) {
    res.status(404);
    throw new Error("session not found!");
  }
  await Session.deleteOne();
  console.log("Session deleted");
  res.status(200).json(session);

});

module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession
};
