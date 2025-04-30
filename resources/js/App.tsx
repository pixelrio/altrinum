import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventsList from './pages/events';
import CreateEvent from './pages/events/create';
import EditEvent from './pages/events/edit';
import ShowEvent from './pages/events/show';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/:id" element={<ShowEvent />} />
        <Route path="/events/:id/edit" element={<EditEvent />} />
      </Routes>
    </BrowserRouter>
  );
}
