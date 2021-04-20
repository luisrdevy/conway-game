import Game from "./Game";

const App = () => {
    return (
        <main>
            <header>
                <h1>Conway's Game of Life</h1>
            </header>
            <Game />
            <section id="#rules">
                <h2>Rules</h2>
                <ol>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopolation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ol>
            </section>
            <section>
                <a href="https://github.com/luisrdevy">luisrdevy</a>
            </section>
        </main>
    )
}

export default App;
