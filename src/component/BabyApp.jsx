import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import { auth } from '@util/firebase';
import { useBaby } from '@context/BabyContext';
import avatar from '@image/default-avatar.jpg';
import { Button, TextField, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const BabyApp = () => {
    const {
        babies,
        setSelectedBaby,
        babiesUrl,
        setEditBaby,
        editBaby,
        updateBaby,
        addBaby,
    } = useBaby();
    const [updateMode, setUpdateMode] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [haveImage, setHaveImage] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [newBabyName, setNewBabyName] = useState('');
    const [newBabyBirthDate, setNewBabyBirthDate] = useState(new Date());
    const history = useHistory();

    const handleDialogOpen = useCallback((isUpdate) => {
        setIsUpdate(isUpdate);
        setDialogOpen(true);
    }, []);

    const handleDialogClose = useCallback(() => {
        setDialogOpen(false);
    }, []);

    useEffect(() => {
        if (editBaby !== '' && babies) {
            const baby = babies?.find((baby) => baby.id === editBaby);
            setName(baby.name);
            setBirthDate(baby.birthDate.toDate());
            setHaveImage(baby.image);
        }
    }, [editBaby, babies]);

    const onUpdateBaby = useCallback(async () => {
        try {
            await updateBaby(editBaby, { birthDate, name, image: haveImage });
        } catch (err) {
            console.log(err);
        }
        handleDialogClose();
    }, [birthDate, editBaby, handleDialogClose, haveImage, name, updateBaby]);

    const onAddBaby = useCallback(async () => {
        try {
            await addBaby({ birthDate: newBabyBirthDate, name: newBabyName, image: false });
        } catch (err) {
            console.log(err);
        }
        handleDialogClose();
    }, [addBaby, handleDialogClose, newBabyBirthDate, newBabyName]);

    const dialog = dialogOpen && (
        <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="form-dialog-title"
            disableBackdropClick
        >
            <DialogContent>
                <img
                    className="h-40 w-40 rounded-full m-auto"
                    src={
                        isUpdate ? (babiesUrl?.[editBaby] ? babiesUrl?.[editBaby] : avatar) : avatar
                    }
                    alt={name}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    value={isUpdate ? name : newBabyName}
                    onChange={(e) =>
                        isUpdate ? setName(e.target.value) : setNewBabyName(e.target.value)
                    }
                    fullWidth
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        fullWidth
                        margin="normal"
                        id="date-picker-dialog"
                        label="Birth Date"
                        format="MM/dd/yyyy"
                        value={isUpdate ? birthDate : newBabyBirthDate}
                        onChange={isUpdate ? setBirthDate : setNewBabyBirthDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={isUpdate ? onUpdateBaby : onAddBaby} color="primary">
                    {isUpdate ? 'UPDATE' : 'CREATE'}
                </Button>
            </DialogActions>
        </Dialog>
    );

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
                                    handleDialogOpen(true);
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
                    className="text-center text-2xl bg-primary text-gray-100 py-2 px-10 w-full rounded-full tracking-wide
                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                shadow-lg cursor-pointer mb-4"
                    onClick={() => handleDialogOpen(false)}
                >
                    Create Baby
                </div>
                <div
                    className="text-center text-2xl bg-primary text-gray-100 py-2 px-10 w-full rounded-full tracking-wide
                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                shadow-lg cursor-pointer mb-4"
                    onClick={() => setUpdateMode((prev) => !prev)}
                >
                    Update Baby
                </div>
                <div
                    className="text-center text-2xl bg-primary text-gray-100 py-2 px-10 w-full rounded-full tracking-wide
                                font-semibold focus:outline-none focus:shadow-outline hover:bg-primary-dark
                                shadow-lg cursor-pointer "
                    onClick={() => auth.signOut()}
                >
                    Log out
                </div>
            </div>
            {dialog}
        </div>
    );
};

export default BabyApp;
