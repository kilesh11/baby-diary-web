import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import { auth } from '@util/firebase';
import { useBaby } from '@context/BabyContext';
import avatar from '@image/default-avatar.jpg';

const BabyApp = () => {
    const { babies, setSelectedBaby, babiesUrl, setEditBaby } = useBaby();
    const [updateMode, setUpdateMode] = useState(false);
    const history = useHistory();

    return (
        <div className="h-screen text-4xl flex flex-col items-center justify-center">
            Choose Baby
            <div className="flex my-10 ">
                {babies &&
                    babies.map((baby) => (
                        <div
                            key={baby.id}
                            className="items-center justify-center mx-4 cursor-pointer"
                            onClick={() => {
                                if (updateMode) {
                                    setUpdateMode(false);
                                    setEditBaby(baby.id);
                                    // natvigation.navigate('BabyDetail', { title: baby.name ?? 'Baby' });
                                } else {
                                    setSelectedBaby(baby.id);
                                    // if (!route.params?.firstLogin) {
                                    //     natvigation.navigate('Home');
                                    // }
                                    history.push('/');
                                }
                            }}
                        >
                            <div
                                className={`flex rounded-full justify-center items-center ${
                                    updateMode ? 'opacity-40' : 'opacity-100'
                                }`}
                            >
                                <img
                                    className="h-40 w-40 rounded-full"
                                    src={babiesUrl?.[baby.id] ? babiesUrl?.[baby.id] : avatar}
                                    alt={baby.name}
                                />
                                {updateMode && (
                                    <SettingsIcon
                                        style={{ color: '#5F75D3', fontSize: '4rem' }}
                                        className="absolute justify-center items-center text-5xl"
                                    />
                                )}
                            </div>
                            <p className="mt-2 text-center text-primary">{baby.name ?? 'Baby'}</p>
                        </div>
                    ))}
            </div>
            <div className="mt-10">
                <div
                    className="text-center bg-primary text-gray-100 py-5 px-10 w-full rounded-full tracking-wide
                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                shadow-lg cursor-pointer mb-4"
                    onClick={() => setUpdateMode((prev) => !prev)}
                >
                    Update Baby
                </div>
                <div
                    className="text-center bg-primary text-gray-100 py-5 px-10 w-full rounded-full tracking-wide
                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                shadow-lg cursor-pointer "
                    onClick={() => auth.signOut()}
                >
                    Log out
                </div>
            </div>
        </div>
    );
};

export default BabyApp;
