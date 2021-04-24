import React from "react";
import Suggestion from "./Suggestion"
import { Container, Table, Row } from "react-bootstrap";
import axios from "axios";
var totalCalories = 0, totalProtein = 0, totalCarbohydrates = 0, totalFat = 0, totalSodium = 0, totalPotassium = 0
var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;

var date = [year, month, day].join('-');
class GetStats extends React.Component {
    constructor() {
        super();
        this.state = {
            food: [],
            requiredNutrition: []
        }
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/',
            { 'headers': { Authorization: `Token ${localStorage.getItem('token')}` } }
        )
            .then(response => {
                this.setState({
                    food: response.data,
                }, () => {
                    this.getRequiredNutrition();
                    if (this.state.food.length !== 0) {

                        this.state.food.map((item) => {
                            if ((item.date).localeCompare(date) === 0) {
                                totalCalories += parseInt(item.calories)
                                totalProtein += parseInt(item.protein)
                                totalCarbohydrates += parseInt(item.carb)
                                totalFat += parseInt(item.fat)
                                totalSodium += parseInt(item.sodium)
                                totalPotassium += parseInt(item.potassium)
                            }
                        })
                    }
                })
            })
            .catch(function (error) {
                // console.log(error);
            });

    }
    getRequiredNutrition() {
        axios.get('http://127.0.0.1:8000/api/getRequiredNutrition/',
            { 'headers': { Authorization: `Token ${localStorage.getItem('token')}` } }
        )
            .then(response => {
                this.setState({
                    requiredNutrition: response.data
                })
            })
    }
    render() {
        return (
            <div>
                <Container>
                    {totalCalories === 0 ?
                        <Row style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
                            <h3>Hey {localStorage.getItem('username')}! Go and eat something!</h3>
                            <br />
                        </Row>
                        : null
                    }
                    <Row style={{ display: "flex", marginTop: "2%" }}>
                        {this.state.requiredNutrition.requiredProtein <= totalProtein || this.state.requiredNutrition.requiredCarb <= totalCarbohydrates ||this.state.requiredNutrition.requiredFat <= totalFat ||this.state.requiredNutrition.requiredSodium <= totalSodium ||this.state.requiredNutrition.requiredPotassium <= totalPotassium?
                            <h4>CUT OFF YOUR DIET IN:</h4> : null}
                        <br />
                        {this.state.requiredNutrition.requiredProtein <= totalProtein ?
                            <Suggestion nutritionName="Protein" ismore="true" perc={(totalProtein * 100) / this.state.requiredNutrition.requiredProtein} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredCarb <= totalCarbohydrates ?
                            <Suggestion nutritionName="Carbohydrates" ismore="true" perc={(totalCarbohydrates * 100) / this.state.requiredNutrition.requiredCarb} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredFat <= totalFat ?
                            <Suggestion nutritionName="Fat" ismore="true" perc={(totalFat * 100) / this.state.requiredNutrition.requiredFat} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredSodium <= totalSodium ?
                            <Suggestion nutritionName="Sodium" ismore="true" perc={(totalSodium * 100) / this.state.requiredNutrition.requiredSodium} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredPotassium <= totalPotassium ?
                            <Suggestion nutritionName="Potassium" ismore="true" perc={((totalPotassium * 100) / this.state.requiredNutrition.requiredPotassium)} />
                            :
                            null
                        }
                    </Row>

                    <Row style={{ display: "flex", marginTop: "2%" }}>
                        <h4>YOUR DIET LACKS:</h4>
                        {this.state.requiredNutrition.requiredProtein > totalProtein ?
                            <Suggestion nutritionName="Protein" perc={(totalProtein * 100) / this.state.requiredNutrition.requiredProtein} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredCarb > totalCarbohydrates ?
                            <Suggestion nutritionName="Carbohydrates" perc={(totalCarbohydrates * 100) / this.state.requiredNutrition.requiredCarb} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredFat > totalFat ?
                            <Suggestion nutritionName="Fat" perc={(totalFat * 100) / this.state.requiredNutrition.requiredFat} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredSodium > totalSodium ?
                            <Suggestion nutritionName="Sodium" perc={(totalSodium * 100) / this.state.requiredNutrition.requiredSodium} />
                            :
                            null
                        }
                        {this.state.requiredNutrition.requiredPotassium > totalPotassium ?
                            <Suggestion nutritionName="Potassium" perc={((totalPotassium * 100) / this.state.requiredNutrition.requiredPotassium)} />
                            :
                            null
                        }
                    </Row>
                    <Row style={{ display: "flex", marginTop: "2%" }}>
                        <h3 ><b>TODAY'S MEALS</b></h3>
                    </Row>
                    <Row style={{ display: "flex", marginTop: "2%" }}>
                        {totalCalories > 0 ?
                            <Table striped bordered hover style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>Food Dish</th>
                                        <th>Calories (kCal)</th>
                                        <th>Protein (g)</th>
                                        <th>Carbohydrates (g)</th>
                                        <th>Total Fat (g)</th>
                                        <th>Sodium (mg)</th>
                                        <th>Potassium (mg)</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.food.map((item) => {
                                        if ((item.date).localeCompare(date) === 0) {
                                            return (
                                                <tr>
                                                    <td>{item.foodDish}</td>
                                                    <td>{item.calories}</td>
                                                    <td>{item.protein}</td>
                                                    <td>{item.carb}</td>
                                                    <td>{item.fat}</td>
                                                    <td>{item.sodium}</td>
                                                    <td>{item.potassium}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </Table> : <h5>No intake yet!</h5>
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}
export default GetStats;