import { createContext, ReactNode, Context, ReactElement } from 'react';


type ContextValue<T> = [Context<T>, T];

export default function Contexts({ values, children }: {
	values: ContextValue<any>[]
	children?: ReactNode
}) {

	return values.reduce((acc, [context, value]) => {
		return (
			<context.Provider value={value}>
				{acc}
			</context.Provider>
		);
	}, children) as any as ReactElement;
	
}

const MobileContext = createContext(false);
const SessionContext = createContext('');

export { SessionContext, MobileContext };