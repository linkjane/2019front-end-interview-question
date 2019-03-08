const api = 'http://localhost:3000';



function request(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        };
        xhr.onerror = () => {
            reject(xhr.status);
        };
        xhr.send();
    })
}

function getStudentsByClassroomId(id) {
    const formatRes = [];
    return new Promise(async resolve =>  {
        let res = await request(`${api}/students?classroomId=${id}`);
        res.forEach(async (student, index) => {
            let courses = await getCoursesByStudentId(student.id);
            let totalScore = 0;
            let averageScore = 0;
            courses.forEach(async (course, index) => {
                let scores = await getScoreByCourseNameAndStudentId(course.id, student.id);
                totalScore += scores[0].score;
                if (courses.length - 1 === index) {
                    averageScore = totalScore / courses.length;
                    formatRes.push({
                        id: student.id,
                        name: student.name,
                        average: averageScore.toFixed(1)
                    });
                }
                if (formatRes.length === res.length) {
                    resolve(formatRes);
                }
            });

        });
    });
}


function getCoursesByStudentId(studentId) {
    return request(`${api}/courses?studentId=${studentId}`)
}

function getScoreByCourseNameAndStudentId(courseName, studentId) {
    return request(`${api}/${courseName}?id=${studentId}`)
}

function getClassroomStudentAverageScore() {
    getStudentsByClassroomId(75).then(res => console.log(res));
}

getClassroomStudentAverageScore();

