const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');

const UserRecordStat = require('../models/User/RecordStatus_Model')
var record = false;
//DATA Accelerometer  
    //get all
    router.post('/start', async (req,res) => {
        try{
            record = true;
            res.json("Recording started.");
        }catch(err){
            console.log(err);
            res.json({message: 'err start Record'});
        }
    });

    router.post('/end', async (req,res) => {
        try{
            record = false;
            res.json("Recording ending");
        }catch(err){
            console.log(err);
            res.json({message: 'err end Record'});
        }
    });
    //get Last
    router.get('/recordStat', async (req,res) => {
        try{
            const recordStat = {
                recordStat: record
            }
            res.json(recordStat); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET Record Stat'});
        }
    });
    //get specific
    //get Last by ID
    router.get('/recordStat/:ID', async (req,res) => {
        try{
            const query = {
                id_pasien: req.query.pasienID
            }
            console.log(req.query.pasienID);
            const UserRecordStat_Last = await UserRecordStat.find(query).limit(1).sort({$natural:-1});
            res.json(UserRecordStat_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET User Record Stat'});
        }
    });
    //START RECORD SPESIFIC
    router.post('/start/:ID', async (req,res) => {
        try{
            const query = {
                id_pasien: req.query.pasienID
            }
            const newRecordStat = {
                id_pasien : req.query.pasienID,
                recordStat : true
            }
            await UserRecordStat.updateOne(query, newRecordStat)
            res.json("Recording User started");
        }catch(err){
            console.log(err);
            res.json({message: 'err start Record'});
        }
    });
    //START RECORD SPESIFIC
    router.post('/stop/:ID', async (req,res) => {
        try{
            const query = {
                id_pasien: req.query.pasienID
            }
            const newRecordStat = {
                id_pasien : req.query.pasienID,
                recordStat : false
            }
            await UserRecordStat.updateOne(query, newRecordStat)
            res.json("Recording User stoped");
        }catch(err){
            console.log(err);
            res.json({message: 'err end Record'});
        }
    });

module.exports = router;