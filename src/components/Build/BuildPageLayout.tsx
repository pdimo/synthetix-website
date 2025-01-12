import styled from 'styled-components';
import media from 'styled-media-query';
import Scrollspy from 'react-scrollspy';

import { FlexDivColCentered } from 'src/styles/common';
import { Header } from '..';
import Sidebar from '../Sidebar';
import BuildFooter from './BuildFooter';

const OutWrapper = styled.div`
	width: 100%;
	background-color: #000; //TODO: refactor to body black background and remove this
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	position: relative;
	gap: var(--s1);
	max-width: ${({ theme }) => theme.maxContentWidthBuild};
	width: 100%;
	position: relative;
	margin: 0 auto;
`;
const SS = styled.div`
	flex-basis: 220px;
	flex-grow: 1;
	margin-top: 60px;

	${media.lessThan('large')`
		display: none;
	`}

	.is-current {
		font-weight: 700;
		font-size: 14px;
		color: #FFFFFF;

	}

	.pass {
		color: #706f6f;
		font-size: 14px;
	}

	ul {
		position: fixed;
		width: 200px;
	}
`;

const MainContent = styled.div`
	flex-basis: 0;
	flex-grow: 999;
	min-inline-size: 50%;
	padding: 0 50px;
	overflow-wrap: anywhere;
	min-height: 100vh; //TODO: refactor to body black background and remove this

	${media.lessThan('medium')`
		padding: 0 25px;
	`}
`;

interface sIProps {
	lv: string;
}

const ScrollItem = styled.li<sIProps>`
	font-family: Inter;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 25px;
	list-style-type: none;
	${(sIProps) => {
		if (sIProps.lv === 'h2') return `margin-left: 10px;`;
		if (sIProps.lv === 'h3') return `margin-left: 20px;`;
		if (sIProps.lv === 'h4') return `margin-left: 30px;`;
	}}
`;

type BuildPageLayoutProps<T> = {
	children: React.Ref<HTMLUListElement> | null;
	headings: [
		{
			style: string;
			slug: string;
			text: string;
		}
	];
	navDocs: T[];
	nextDoc: T[];
	prevDoc: T[];
	updatedAt: T[];
};

export default function BuildPageLayout<T>(props: BuildPageLayoutProps<T>) {
	const { children, headings, navDocs, nextDoc, prevDoc, updatedAt } = props;
	const headingList = headings.map((a: any) => a.slug);
	const subMenu = {
		label: 'build',
		navtitle: 'Build Documents',
		items: navDocs,
	};
	return (
		<FlexDivColCentered>
			<Header navDocs={subMenu} navShort={true} />
			<OutWrapper>
				<ContentWrapper>
					<Sidebar navDocs={navDocs} subSlug="build" />
					<MainContent>
						{children}
						<BuildFooter nextDoc={nextDoc} prevDoc={prevDoc} updatedAt={updatedAt} />
					</MainContent>
					<SS>
						<Scrollspy
							items={headingList}
							currentClassName="is-current"
							scrolledPastClassName="pass"
						>
							{headings.map((item, key) => (
								<ScrollItem key={key} lv={item.style}>
									<a href={`#${item.slug}`}>{item.text}</a>
								</ScrollItem>
							))}
						</Scrollspy>
					</SS>
				</ContentWrapper>
			</OutWrapper>
		</FlexDivColCentered>
	);
}
