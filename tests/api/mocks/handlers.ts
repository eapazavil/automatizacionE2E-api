import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  // Login handler
  rest.post('http://localhost:3000/api/login', async (req, res, ctx) => {
    const { username, password } = await req.json();
    
    if (username === 'standard_user' && password === 'secret_sauce') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-jwt-token',
          user: {
            id: '1',
            username: 'standard_user'
          }
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        error: 'Invalid credentials'
      })
    );
  }),

  // Products handler
  rest.get('http://localhost:3000/api/products', (req, res, ctx) => {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'Unauthorized'
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Sauce Labs Backpack',
          desc: 'carry.allTheThings() with the sleek, streamlined Sly Pack',
          price: 29.99,
          image_url: '/images/sauce-backpack-1200x1500.jpg'
        },
        {
          id: 2,
          name: 'Sauce Labs Bike Light',
          desc: "A red light isn't the desired state in testing but it sure helps when riding your bike at night",
          price: 9.99,
          image_url: '/images/bike-light-1200x1500.jpg'
        }
      ])
    );
  }),

  // Cart handler
  rest.post('http://localhost:3000/api/cart', (req, res, ctx) => {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        message: 'Item added to cart'
      })
    );
  }),

  // Checkout handler
  rest.post('http://localhost:3000/api/checkout', (req, res, ctx) => {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({
        orderId: '12345',
        status: 'completed'
      })
    );
  })
];

export const server = setupServer(...handlers);