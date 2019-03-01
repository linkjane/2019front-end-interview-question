const api = 'http://localhost:3000';



function request(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        callback(JSON.parse(xhr.responseText));
    };
    xhr.send();
}

function getStudentsByClassroomId(id, callback) {
    const formatRes = [];
    request(`${api}/students?classroomId=${id}`, res => {
        res.forEach((student, index) => {
            getCoursesByStudentId(student.id, courses => {
                let totalScore = 0;
                let averageScore = 0;
                courses.forEach((course, index) => {
                    getScoreByCourseNameAndStudentId(course.id, student.id, scores => {
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
                            callback(formatRes);
                        }
                    });
                });

            });
        });
    });

}

function getCoursesByStudentId(studentId, callback) {
    request(`${api}/courses?studentId=${studentId}`, res => {
        callback(res);
    })
}

function getScoreByCourseNameAndStudentId(courseName, studentId, callback) {
    request(`${api}/${courseName}?id=${studentId}`, res => {
        callback(res);
    });
}

function getClassroomStudentAverageScore() {
    getStudentsByClassroomId(75, res => {
        console.log(res);
    });
}

getClassroomStudentAverageScore();
