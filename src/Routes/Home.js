import React, {useState} from 'react'
import './Home.css'
import Impressum from './Impressum'
import rBengel from '../Images/img/radiobengel.png'


export default function Home() {
	const [eng, setEng] = useState(false)
	const [impToggle, setImpToggle] = useState(false)
		
  return (
    <div className='hallo'>
	
		<div className="halloHead">
			<i>HALLO: HALLO: HALLO: HALLO:</i>
		</div>
		
		<div className="info">
		
			<div className="langBtn" onClick={() => setEng(!eng)}>
				<span className={eng ? "" : "main-col"}>GER</span>/<span className={!eng ? "" : "main-col"}>ENG</span>
			</div>

			{eng ?
			<EnglishInfo />
			:
			<GermanInfo />
			}
			<div className='links'>
						<a target="_blank" and rel="noopener noreferrer" href='https://soundcloud.com/hallo-radio'>Soundcloud</a>
						<a target="_blank" and rel="noopener noreferrer" href='https://www.hallohallohallo.org'>HALLO e.V</a>
						<a onClick={() => setImpToggle(!impToggle)} href='#'>Impressum</a>
					</div>


			
		</div>

		<img className="bengel" src={rBengel}></img>
			
		{
			impToggle && <Impressum />
		}
	</div>
  )
}




function GermanInfo(){
	return(
		<div className="infoText">

		<h3>HALLO ihr,</h3>
		<br />
		<ol>
		<p>
			Ihr seid Teil des Radios oder könnt es sein und werden!
			HALLO: Radio ist geöffnet für euch.
			HALLO: Radio ist ein gemeinschafliches Radio
			und ihr könnt mitsenden.
		</p>
		<br />
		<p>
			Wenn ihr schon immer mal eine Sendung machen
			wolltet, könnt ihr das tun und die Gemeinschaft kann
			euch dabei helfen.
			Wir möchten den Ort, die Technik und die Strukturen,
			die wir geschaffen haben, teilen.
		</p>
		<br />
		<p>
			Tragt bei, was euch wichtig ist: Ein Hörspiel über euren
			Stadtteil, eine selbstgeschriebene Geschichte, Musik,
			die begeistert oder entgeistert, eine Kochsendung oder
			ein Anrufgewinnspiel — Fast alles ist möglich.
			Seid umsichtig: Gebt Menschen Raum,
			denen nicht viele Räume im Leben offen stehen und
			unterstützt euch gegenseitig.
		</p>
		<br />
		<p>
			Spread the word! Aber bewusst. Das HALLO: Radio sendet
			global, aber begreift sich als Begegnungsort. Kommt
			zum Senden möglichst in die Schaltzentrale und belebt
			den Ort. Oder schlagt Brücken zu neuen Orten.
		</p>
		<br />
		<p>
			Nehmt Kontakt auf und schildert eure Ideen.
		</p>
		<br />
		<p>
			Kommt vorbei in der
			Schaltzentrale (Bullerdeich 14b, 20537 Hamburg)

			Oder schreibt eine Mail an 
			<a href="mailto:info@halloradio.net">info@halloradio.net</a>
			Wenn ihr schon Sendungen macht,
			kommt in die <a target="_blank" rel="noopener noreferrer" href="https://t.me/halloradio">Telegram-Gruppe </a>
		</p>

		<p>
			Macht mit, denn das Radio sind wir alle!
			Euer HALLO: Radio
		</p>
  	</ol>
		</div>
	
	)
}


function EnglishInfo(){
	return(
		<div className='infoText'>
			
			<h3>HALLO you,</h3>
			<br />
			<p>
				You are part of the Radio or you can be
				and become one!
				HALLO: Radio is open fou you.
				HALLO: Radio is a collective Radio and you can take
				part in broadcasting.
			</p>
			<br />
			<p>
				If you always wanted to do a show, you can do it and the
	community can help you.
	We want to share the place, the equipment and the
	structures, we have collectively built.
			</p>
			<br />
			<p>
				Contribute, what is important to you: A radioplay about
				your neighbourhood, a story you wrote yourself, music
				that thrills or unnerves, a cooking show or a phone callcompetition
				— almost everything is possible.
				Be thoughtful: Give space to people who are not given
				as much space as you in life and support each other.
			</p>
			<br />
			<p>
			Spread the word! But consciously. HALLO: Radio is broadcasting globally but understands
itself as a place of meeting. If possible, come to the Schaltzentrale to broadcast and liven
up the place. Or establish connections to new places.
			</p>
			<br />
			<p>
				Get in contact and present your ideas.
			</p>
			<br />
			<p>
				Come to the Café at Schaltzentrale (every Sunday at
				Bullerdeich 14b, 20537 Hamburg) 
			</p>
			<br />
			<p>

				Or write an e-mail to 	<a href="mailto:info@halloradio.net">info@halloradio.net</a>
				If you are already doing a show, join the Telegram group
				
				<a href="https://t.me/halloradio">https://t.me/halloradio</a>
			</p>
			<br />
			<p>
				Take part, because all of us are the radio!
				Your HALLO: Radio
			</p>
			
			

	</div>
	)
}
