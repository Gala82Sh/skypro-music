import './page.css';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import MainContent from '@/components/MainContent/MainContent';
import PlayerBar from '@/components/PlayerBar/PlayerBar';  

export default function SelectionPage() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Header />
          <MainContent />
          <Sidebar />
        </main>
        <PlayerBar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}