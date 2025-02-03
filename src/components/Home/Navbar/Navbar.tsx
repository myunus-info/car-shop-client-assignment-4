import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { Menu as MenuIcon, ShoppingCartIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { selectCartState } from '../../../store/features/cart/cartSlice';
import logo from '../../../assets/logo.webp';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { totalQuantity } = useAppSelector(selectCartState);

  const menuItems = [
    {
      key: 'home',
      label: (
        <NavLink
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#E8F4FF' : '#fff',
            color: isActive ? '#1677ff' : '#313131',
            padding: '5px 10px',
            borderRadius: '5px',
          })}
        >
          Home
        </NavLink>
      ),
    },
    {
      key: 'about',
      label: (
        <NavLink
          to="/about"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#E8F4FF' : '#fff',
            color: isActive ? '#1677ff' : '#313131',
            padding: '5px 10px',
            borderRadius: '5px',
          })}
        >
          About
        </NavLink>
      ),
    },
    {
      key: 'products',
      label: (
        <NavLink
          to="/products"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#E8F4FF' : '#fff',
            color: isActive ? '#1677ff' : '#313131',
            padding: '5px 10px',
            borderRadius: '5px',
          })}
        >
          Products
        </NavLink>
      ),
    },
    {
      key: 'contact',
      label: (
        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#E8F4FF' : '#fff',
            color: isActive ? '#1677ff' : '#313131',
            padding: '5px 10px',
            borderRadius: '5px',
          })}
        >
          Contact
        </NavLink>
      ),
    },
    {
      key: 'signup',
      label: (
        <NavLink to="/signup" style={{ padding: '5px 10px' }}>
          Signup
        </NavLink>
      ),
    },
    {
      key: 'login',
      label: (
        <NavLink to="/login" style={{ padding: '5px 10px' }}>
          Login
        </NavLink>
      ),
    },
    {
      key: 'cart',
      label: (
        <NavLink
          to="/cart"
          style={({ isActive }) => ({
            color: isActive ? '#1677ff' : '#313131',
          })}
        >
          <p style={{ position: 'relative' }}>
            <ShoppingCartIcon />
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '15px',
                height: '15px',
                padding: '10px',
                borderRadius: '50%',
                backgroundColor: 'crimson',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '.75rem',
                fontWeight: 'bold',
              }}
            >
              {totalQuantity}
            </span>
          </p>
        </NavLink>
      ),
    },
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        padding: '0',
        background: '#fff',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '8rem', height: '3.5rem' }}>
          <img src={logo} style={{ width: '100%', height: '100%', borderRadius: '.3rem' }} />
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{
              minWidth: 0,
              flex: 'auto',
              border: 'none',
              justifyContent: 'flex-end',
            }}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-button">
          <Button type="text" icon={<MenuIcon size={24} />} onClick={() => setOpen(true)} />
        </div>

        {/* Mobile Menu Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          styles={{
            header: {
              borderBottom: '1px solid #f0f0f0',
            },
            body: {
              padding: 0,
            },
          }}
        >
          <Menu
            mode="vertical"
            items={menuItems}
            style={{
              border: 'none',
              width: '100%',
            }}
          />
        </Drawer>
      </div>
    </Header>
  );
};

export default Navbar;
