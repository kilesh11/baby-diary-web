import { Route, Switch } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ProtectedRoute from '@component/ProtectedRoute';
import LoginApp from '@component/LoginApp';
import MainApp from '@component/MainApp';
import { useAuth } from '@context/AuthContext';

// export default App;
const App = () => {
    const { isLoading } = useAuth();
    return isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center">
            <ScaleLoader color="#788eec" height={150} width={10} radius={10} margin={10} />
        </div>
    ) : (
        <Switch>
            <Route path="/login" exact component={LoginApp} />
            <ProtectedRoute path="/" exact component={MainApp} />
        </Switch>
    );
};

export default App;
