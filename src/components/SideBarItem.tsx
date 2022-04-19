import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AccordionSection = styled.div`
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	margin-top: 10px;
`;

const Wrap = styled.div`
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	cursor: pointer;
	h1 {
		font-weight: bold;
		font-size: 14px;
		line-height: 20px;
		color: #808191;
	}
	h1.active {
		background: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	span {
		margin-left: 15px;
		margin-top: 5px;
	}
`;

const Dropdown = styled.ul`
	color: #808191;
	font-size: 12px;

	a:hover {
		background: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	a.active {
		background: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
`;

export default function SideBarItem({ props, subSlug }: any) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const router = useRouter();
	useEffect(() => {
		const currentSlug = router.query.slug;

		// eslint-disable-next-line array-callback-return
		props.docs.map((doc: any) => {
			if (doc.slug.current === currentSlug) {
				setIsOpen(true);
			}
		});
	}, [props, router]);

	return (
		<IconContext.Provider value={{ color: '#ffffff', size: '15px' }}>
			<AccordionSection>
				<Wrap onClick={() => toggle()}>
					<h1 className={isOpen ? 'active' : ''}>{props.title}</h1>
					<span>{isOpen === true ? <FiChevronDown /> : <FiChevronUp />}</span>
				</Wrap>
				{isOpen === true ? (
					<Dropdown>
						{props.docs.map((doc: any, i: number) => (
							<li key={i}>
								<Link href={`/${subSlug}/${doc.slug.current}`}>
									<a className={router.query.slug === doc.slug.current ? 'active' : ''}>
										{doc.title}
									</a>
								</Link>
							</li>
						))}
					</Dropdown>
				) : null}
			</AccordionSection>
		</IconContext.Provider>
	);
}