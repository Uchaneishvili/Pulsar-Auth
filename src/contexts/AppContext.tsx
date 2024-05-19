import React, { memo, useState } from "react";

interface IAppContext {
	loading: boolean;
	setLoading: () => void;
}

const initialState: IAppContext = {
	loading: false,
	setLoading: () => {},
};

const AppContext = React.createContext<IAppContext>(initialState);
export const AppProvider = memo((props: any) => {
	const [state, setState] = useState<IAppContext>({
		...initialState,
		setLoading: () => {
			setState((state) => ({
				...state,
				loading: !state.loading,
			}));
		},
	});

	return (
		<AppContext.Provider value={state}>{props.children}</AppContext.Provider>
	);
});

export default AppContext;
