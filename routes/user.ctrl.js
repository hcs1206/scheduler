const { user } = require('../models');

const login = (req,res) => {
    const userId = req.body.userId || req.query.id;;
    const password = req.body.password || req.query.password;
    if (!userId) {
        res.json({
            result: 'fail',
            err: '아이디를 입력해주세요'
        });
    } else {
        if (!password) {
            res.json({
                result: 'fail',
                err: '비밀번호를 입력해주세요'
            });
        } else {
            console.log('find one')
            user.findOne({
                where: {
                    userId,
                    password
                }
            }).then(result => {
                if (result) {
                    res.cookie('userId', userId);
                    res.json({
                        result: 'success'
                    });
                } else {
                    res.json({
                        result: 'fail',
                        err: '계정 정보가 일치하지 않습니다.'
                    });
                }
            });
        }
    }
};

const logout = (req, res) => {
    res.clearCookie('userId');
    res.redirect('/');
};

const join = (req,res) => {
    console.log('userjoin 접속 함')
    var id = req.body.userId || req.query.id;;
    var password = req.body.password || req.query.password;
    var engName = req.body.engName || req.query.engName;
    var name = req.body.name || req.query.name;
    console.log('param : ' + id + ', ' + password + ', ' + engName + ', ' + name);
    if(!id || !password || !engName || !name){
        res.json({
            result: 'fail',
            err: '가입 정보를 올바르게 입력해주세요'
        });
    } else {
        user.create({
            userId:id,
            password:password,
            name:name,
            engName:engName
        });
        res.cookie('userId', id);
        res.json({
            result: 'success'
        });
    }
};

module.exports = {
    login, logout, join
};