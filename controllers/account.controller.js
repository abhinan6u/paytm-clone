const mongoose = require('mongoose');
const Account = require('../models/account.models');

// Get Balance
exports.getBalance = async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
    res.json({ balance: account.balance });
};

// Transfer Funds
exports.transferFunds = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid recipient" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Transfer failed" });
    } finally {
        session.endSession();
    }
};
