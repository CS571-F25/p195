import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function Home (props) {

    const [recipes, setRecipes] = useState({});

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/recipes", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(data => {
            setRecipes(data.results);
            console.log(data.results);
        })
    }, []);

    return <div style={{ width: "100%"}}>
        <div className="justify-content-center text-center">
        <h1>Welcome to Foodie!</h1>
        <p></p>
        <p>Your go-to app for discovering and sharing delicious recipes from around the world.
        <br/>Whether you're a seasoned chef or just starting out in the kitchen, Foodie has something for everyone.
        <br/>Explore a vast collection of recipes, save your favorites, and connect with a community of food enthusiasts.
        <br/>Let's get cooking!</p>
        </div>
        <div style={{ width: "100%", margin: "2rem", marginLeft: "5rem" }}>
            <h2>Featured Recipes:</h2>
            {
                Object.keys(recipes).length > 0 ? 
                    <Container>
                        <Row>
                            {
                                Object.values(recipes).map(recipe => {
                                    // TODOL: add key prop, make scrollable
                                    return <Col xs={12} md={6} lg={4} xl={3}>
                                        <RecipeCard {...recipe} />
                                    </Col>
                                })
                            }
                        </Row>
                    </Container> 
                : <p>Loading...</p>
            }
            <h2>Seasonal Specials:</h2>
            {
                Object.keys(recipes).length > 0 ? 
                    <Container>
                        <Row>
                            {
                                Object.values(recipes).map(recipe => {
                                    // TODOL: add key prop, make scrollable
                                    return <Col xs={12} md={6} lg={4} xl={3}>
                                        <RecipeCard {...recipe} />
                                    </Col>
                                })
                            }
                        </Row>
                    </Container> 
                : <p>Loading...</p>
            }
            <h2>Country of the Month: Germany</h2>
            {
                Object.keys(recipes).length > 0 ? 
                    <Container>
                        <Row>
                            {
                                Object.values(recipes).map(recipe => {
                                    // TODOL: add key prop, make scrollable
                                    return <Col xs={12} md={6} lg={4} xl={3}>
                                        <RecipeCard {...recipe} />
                                    </Col>
                                })
                            }
                        </Row>
                    </Container> 
                : <p>Loading...</p>
            }
        </div>
    </div>
}