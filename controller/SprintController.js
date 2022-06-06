const mongoose = require("mongoose");
const ProjectLead = require("../model/ProjectLead");
const Sprint = require("../model/Sprint")
const user = require("../model/user")


//mail
exports.RegisterSprint = async (req, res) => {
    try {
        const { User, Project, StartDate, EndDate, SprintStatus } = req.body;
        const findprojectstatus = await ProjectLead.findById(Project)
        console.log(findprojectstatus)

        if (findprojectstatus.status === 'success') {
            const Sprints = await Sprint.create({
                User: User, Project: Project, StartDate: StartDate, EndDate: EndDate, SprintStatus: SprintStatus
            })

            if (!Sprints) {
                res.status(400).json({ error: "Sprint register is not possible" });
                return
            }

            if (Sprints) {
                res.status(200).json({ message: "Sprint is registered ", Sprints })
                return
            }
            return;
        }
        res.status(400).json({ message: "Lead is note converted into project " })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Sprint register is not possible in catch" });
    }
}

// get all sprint with user and project 

exports.GetSprint = async (req, res) => {
    try {
        // const { User , Project , StartDate , EndDate , SprintStatus} = req.body;
        const Sprints = await Sprint.find().populate("User").populate("Project");

        if (!Sprints) {
            res.status(400).json({ error: "Sprint Get is not possible" });
            return
        }

        if (Sprints) {
            res.status(200).json({ message: "Sprint is get ", Sprints })
            return
        }
    } catch (error) {
        res.staus(400).json({ error: "Sprint Get is not possible in catch" });
    }
}


// get only one sprint of id of user 

exports.GetUserSprint = async (req, res) => {
    try {

        const Sprints = await Sprint.findById(req.params.id).populate("User").populate("Project");

        if (!Sprints) {
            res.status(400).json({ error: "Sprint Get is not possible" });
            return
        }

        if (Sprints) {
            res.status(200).json({ message: "Sprint is get with user ", Sprints })
            return
        }
    } catch (error) {
        res.staus(400).json({ error: "Sprint Get is not possible in catch" });
    }
}


exports.UpdateUseidSprint = async (req, res) => {
    try {
        const { User, Project, StartDate, EndDate, SprintStatus } = req.body;

        // const Sprints = await Sprint.findOne({User : req.params.id})
        const Sprints = await Sprint.findById(req.params.id)
        // const Sprints = await Sprint.findById(req.params.id)
        console.log(Sprints)

        if (!Sprints) {
            res.status(400).json({ message: "Sprint With this user id is not in database" })
            return
        }

        if (Sprints) {

            const SprintsUser = await Sprint.findByIdAndUpdate(req.params.id, {
                User: User, Project: Project, StartDate: StartDate, EndDate: EndDate, SprintStatus: SprintStatus
            }, { new: true })


            if (!SprintsUser) {
                res.status(200).json({ message: "Sprint with this user id is is not added in another try" })
                return
            }

            if (SprintsUser) {
                res.status(200).json({ message: "Sprint with this user id is possible", SprintsUser })
                return
            }

        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Sprint Update is not possible in catch" });
    }
}



exports.DeleteSprint = async (req, res) => {
    try {
        const Sprints = await Sprint.findById(req.params.id)
        // const Sprints = await Sprint.findById(req.params.id)
        console.log(Sprints)

        if (!Sprints) {
            res.status(400).json({ message: "Sprint With this user id is not for delete in database" })
            return
        }

        if (Sprints) {

            const SprintsUser = await Sprint.findByIdAndDelete(req.params.id)


            if (!SprintsUser) {
                res.status(200).json({ message: "Sprint with this user id is is not for delete in another try" })
                return
            }

            if (SprintsUser) {
                res.status(200).json({ message: "Sprint with this user id is possible for delete", SprintsUser })
                return
            }

        }
    } catch (error) {
        res.status(400).json({ message: "Sprint Delete is not possible for delete in catch" });
    }
}

