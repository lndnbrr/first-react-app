'use client';

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          🏠 First React App!
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/form">
              ➕ CREATE A FACT
            </Link>

            {/* Link element that uses a className(class) to keep styling consistent and href attribute to get the responses of a specific user where it searches for the value of the responses that are ONLY Yes.   */}
            <Link className="nav-link" href={`/response/${user.uid}?value=Yes`}>
              ✅ YES
            </Link>

            {/* Link element that uses a className(class) to keep styling consistent and href attribute to get the responses of a specific user where it searches for the value of the responses that are ONLY No.   */}
            <Link className="nav-link" href={`/response/${user.uid}?value=No`}>
              ❌ NO
            </Link>
          </Nav>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
