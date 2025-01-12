import Head from 'next/head';
import { PageLayout } from 'src/components';
import FurtherLinking from 'src/sections/governance/furtherLinking';
import GovernanceMain from 'src/sections/governance/main';
import Table from 'src/sections/governance/table';
import { Line } from 'src/styles/common';

export default function Governance() {
	return (
		<>
			<Head>
				<title>Synthetix - Governance</title>
			</Head>
			<PageLayout>
				<GovernanceMain />
				<Table />
				<FurtherLinking />
				<Line showOnMobile />
			</PageLayout>
		</>
	);
}
