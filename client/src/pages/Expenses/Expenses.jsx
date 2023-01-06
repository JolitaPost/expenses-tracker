import { useEffect } from "react";
import { useState } from "react"


export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/expenses?userId=1')
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
        <div>
            {expenses.map((expense) => <div key={expense.id}>{expense.amount}</div>)}
        </div>
    );
}