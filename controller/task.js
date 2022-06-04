const Sprint = require('../model/Sprint')
const Task = require('../model/task')


exports.addTask = async (req, res) => {
    try {
        const { name, EmployeeName, startDate, endDate, status, tag, sprint } = req.body

        const createTask = await Task.create({
            name, EmployeeName, startDate, endDate, status, tag, sprint
        })
        if (!createTask) {
            res.status(400).json({ message: "cannot create task" })
            return;
        }
        console.log(createTask)
        if (createTask) {
            let ct = await Sprint.findByIdAndUpdate(createTask.sprint, {
                $push: {
                    "task": {
                        name: createTask.name,
                        startDate: createTask.startDate,
                        endDate: createTask.endDate,
                        status: createTask.status,
                        tag: createTask.tag,
                        descriptions: req.body.descriptions
                    }
                }
            })
            // console.log(ct)
            res.status(200).json({ message: "task created", ct })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong !!!" })
    }
}