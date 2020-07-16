const { event } = require('../models');

const list = (req, res) => {
    console.log(req.cookies);
    var userId = req.cookies.userId;
    event.findAll({
        where: {
            userId
        }
    }).then(result => {
        if (result) {
            res.json({
                result: "success",
                data: result
            });
        }
    });
};

const create = (req, res) => {
                var userId = req.cookies.userId;
                var title = req.body.title;
                var desc = req.body.desc;
                var start = req.body.start;
                var end = req.body.end;

                if (!userId || !title || !desc || !start || !end) {
                    res.json({
                        result: 'fail',
            err: 'Todo 정보를 올바르게 입력해주세요'
        });
    } else {
        event.create({
            userId, title, desc, start, end
        }).then(result => {
            res.json({
                result: 'success'
            });
        }).error(err => {
            res.json({
                result: 'fail',
                err: 'Todo 등록을 실패하였습니다'
            });
        });
    }
};

const update = (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var desc = req.body.desc;
    var start = req.body.start;
    var end = req.body.end;

    if (!id || !title || !desc || !start || !end) {
        res.json({
            result: 'fail',
            err: 'Todo 정보를 올바르게 입력해주세요'
        });
    } else {
        event.update({
            title, desc, start, end
        },{
            where: {
                id
            }
        }).then(result => {
            res.json({
                result: 'success'
            });
        }).error(err => {
            res.json({
                result: 'fail',
                err: 'Todo 수정을 실패하였습니다'
            });
        });
    }
};

const remove = (req, res) => {
    var id = req.body.id;

    if (!id) {
        res.json({
            result: 'fail',
            err: 'Todo 정보를 올바르지 않습니다'
        });
    } else {
        event.destroy({
            where: {
                id
            }
        }).then(result => {
            res.json({
                result: 'success'
            });
        }).error(err => {
            res.json({
                result: 'fail',
                err: 'Todo 삭제를 실패하였습니다'
            });
        });
    }
};

module.exports = {
    list, create, update, remove
};