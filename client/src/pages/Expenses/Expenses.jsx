import { useEffect } from "react";
import { useState } from "react";
import styled from 'styled-components';
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

    return (
        <ExpensesList>
            {expenses.map((expense) => (
                <ExpensesListItem key={expense.id}>
                    <ExpenseType>{expense.type}</ExpenseType>
                    <ExpenseAmount>{expense.amount}€</ExpenseAmount>
                </ExpensesListItem>
            ))}
        </ExpensesList>
    );
}