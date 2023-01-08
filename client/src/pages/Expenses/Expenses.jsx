import { useEffect } from "react";
import { useState } from "react";
import { API_URL, LOGGED_IN_USER } from "../../constants/constants";



export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
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