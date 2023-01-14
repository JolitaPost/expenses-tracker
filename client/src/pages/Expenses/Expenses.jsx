import { stripBasename } from "@remix-run/router";
import { useEffect } from "react";
import { useState } from "react";
import styled from 'styled-components';
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"; 
import { LOGGED_IN_USER } from "../../constants/constants";

const ExpensesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

const ExpensesListItem = styled.li`
    align-items: center;
    border-radius: 10px; 
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    display: flex;
    justify-content: space-between;
    padding: 10px 30px 10px 10px;
`;

const ExpenseAmount = styled.span`
    color: #35d8ac;
    font-size: 34px;
    font-weight: 700;
`;
const ExpenseType = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;


export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
        .then(res => res.json())
        .then(data => {
            setExpenses(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    };

    const handleExpenseAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type,
                amount,
                userId: 1
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setExpenses(data);
            setType('');
            setAmount('');
        });
    }

    return (
        <ExpensesList>
            <form onSubmit={handleExpenseAdd}>
                <Input placeholder="Type"
                required
                onChange={(e) => setType(e.target.value)}
                value={type}
                />
                <Input
                placeholder="Amount"
                type="number"
                reguired
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                />
                <Button>Add</Button>
            </form>
            {expenses.map((expense) => (
                <ExpensesListItem key={expense.id}>
                    <ExpenseType>{expense.type}</ExpenseType>
                    <ExpenseAmount>{expense.amount}€</ExpenseAmount>
                </ExpensesListItem>
            ))}
        </ExpensesList>
    );
}