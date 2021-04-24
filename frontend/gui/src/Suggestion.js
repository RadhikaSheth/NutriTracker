import React from "react"
import { Container, Row } from "react-bootstrap";

class Suggestion extends React.Component {
    render() {
        return (
            <Container>
                <Row style={{ backgroundColor: this.props.ismore ? "#faf0e6" : "#ebf5f0", padding: "1%", display: "flex", justifyContent: "space-between" }}>
                    <h5><b>{this.props.nutritionName}</b></h5>
                    <h5 style={{ color: this.props.ismore ? "#de5d83" : "#00a877" }}><b>{this.props.perc.toFixed(2)} % </b></h5>
                </Row>
                <Row style={{ backgroundColor: "#F8F8FF", padding: "1%" }}>
                    {this.props.ismore === "true" ?
                        <span>Eat less:</span>
                        :
                        <span>Eat more:</span>
                    }
                </Row>
                <Row style={{ backgroundColor: "#F8F8FF", padding: "1%" }}>
                    {this.props.nutritionName === "Protein" ?
                        <ul>
                            <li>Eggs, Fish and Seafood </li>
                            <li>Dairy products – milk, yoghurt (especially Greek yoghurt), cheese (especially cottage cheese)</li>
                            <li>Nuts (including nut pastes) and seeds – almonds, pine nuts, walnuts, macadamias, hazelnuts, cashews, pumpkin seeds, sesame seeds, sunflower seeds</li>
                            <li>Legumes and beans – all beans, lentils, chickpeas, split peas, tofu</li>
                        </ul>
                        : null
                    }
                    {this.props.nutritionName === "Carbohydrates" ?
                        <ul>
                            <li>Vegetables (Sweet Potatoes, Beetroots, Corn)</li>
                            <li>Grains (Quinoa, Brown rice, Oats)</li>
                            <li>Fruits (Bananas, Apples, Mangos)</li>
                            <li>Dried fruits (Dates, Raisins, Goji berries)</li>
                            <li>Pulses (Kidney beans, Garbanzo beans, Lentils)</li>
                        </ul>
                        : null
                    }
                    {this.props.nutritionName === "Fat" ?
                        <ul>
                            <li>Avocado</li>
                            <li>Chia seeds</li>
                            <li>Dark chocolate</li>
                            <li>Eggs</li>
                            <li>Fatty fish</li>
                            <li>Flaxseeds</li>
                            <li>Nuts</li>
                            <li>Nut and seed butter</li>
                            <li>Olives</li>
                            <li>Tofu</li>
                            <li>Yogurt</li>
                        </ul>
                        : null
                    }
                    {this.props.nutritionName === "Sodium" ?
                        <ul>
                            <li>Shrimp</li>
                            <li>Ham</li>
                            <li>Cottage Cheese</li>
                            <li>Vegetable Juice</li>
                            <li>Processed Cheese</li>
                            <li>Tortillas</li>
                        </ul>
                        : null
                    }
                    {this.props.nutritionName === "Potassium" ?
                        <ul>
                            <li>Bananas, oranges, cantaloupe, honeydew, apricots, grapefruit (some dried fruits, such as prunes, raisins, and dates, are also high in potassium)</li>
                            <li>Potatoes and Sweet potatoes</li>
                            <li>Cooked spinach, broccoli</li>
                            <li>Leafy greens</li>
                            <li>Juice from potassium-rich fruits (Orange, Tomato, Prune, Apricot, Grapefruit)</li>
                            <li>Certain dairy products, such as milk and yogurt, are high in potassium (low-fat or fat-free is best).</li>
                            <li>Fish (Tuna, Halibut, Cod, Trout,Rockfish )</li>
                        </ul>
                        : null
                    }
                </Row>
            </Container>
        )
    }
}
export default Suggestion;