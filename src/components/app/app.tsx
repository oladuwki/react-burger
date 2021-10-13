import appComponent from './app.module.css';
import data from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <section className="pl-10 pr-10 pt-10">
      <AppHeader />
      <section className={appComponent.mainContainer} >
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </section>
    </section>
  );
}

export default App;