/*jshint esversion: 6 */
const Joi = require('joi');
const exp = require('constants');
const express = require('express');
const app = express();

app.use(express.json())

var courses = [
    { id: 1, name: "Java Tutorial for Beginners 2023", videoAdress: "https://www.youtube.com/watch?v=BGTx91t8q50&list=RDCMUC59K-uG2A5ogwIrHw4bmlEg&index=1" },
    { id: 2, name: "How to build a REST API with Node js & Express", videoAdress: "https://www.youtube.com/watch?v=pKd0Rpw7O48&list=RDCMUCWv7vMbMWH4-V0ZXdmDpPBA&index=29" },
    { id: 3, name: "JavaScript Full Course (2023) - Beginner to Pro - Part 1", videoAdress:"https://www.youtube.com/watch?v=SBmSRK3feww" },
    { id: 4, name: "HTML Tutorial for Beginners: HTML Crash Course", videoAdress: "https://www.youtube.com/watch?v=qz0aGYrrlhU&list=RDCMUCWv7vMbMWH4-V0ZXdmDpPBA&index=2"}
];

// 校验课程输入参数
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        videoAdress: Joi.string().required()
    });
    return schema.validate(course);
}

app.get('/', (req, res) => {
    res.send('Hello World, this is a course express node.js examples');
});

// 获取所有的课程列表
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// 根据课程id获取对应的课程信息
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send(`The course with the given ID ${req.params.id} was not found`);
    }
    res.send(course);
});

// 新增一个课程
app.post('/api/courses', (req, res) => {
    // 解构赋值
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        videoAdress: req.body.videoAdress
    };
    courses.push(course);
    res.send(course);
});

// 更新课程信息
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send(`The course with the given ID ${req.params.id} was not found`);
    }
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Update the course
    course.name = req.body.name;
    course.videoAdress = req.body.videoAdress;
    // 返回更新后的课程信息
    res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`express server listening on port ${port}...`);
});