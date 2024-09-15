"use client"
import React from 'react'
import styled from 'styled-components'
import { useGlobalState } from '@/app/context/globalProvider'

function Sidebar() {
  const {theme } = useGlobalState();
  // console.log(theme);
  return <SidebarStyled theme={theme}>Sidebar</SidebarStyled>
}

const SidebarStyled = styled.nav`
  position: relative;
  border-radius: 1rem;
  border: 2px solid ${ (props) => props.theme.borderColor2};
  width: ${ (props) => props.theme.sidebarWidth};
  background: ${ (props) => props.theme.colorBg2};
`
export default Sidebar