const THRESHOLD = 0.5;

function App() {
    return (
        <div className={'App'}>
            {
                do {
                    if (Math.random() > THRESHOLD) {
                        ('Govno');
                    } else {
                        ('Pizda');
                    }
                }
            }
        </div>
    );
}

export default App;
