import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GehaltKlar</Text>
          <Text style={styles.headerSubtitle}>Über uns</Text>
          <View style={styles.headerIcon}>
            <Info size={24} color="#1565C0" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impressum</Text>
          <View style={styles.contentCard}>
            <Text style={styles.impressumText}>
              Mohamed Abdelhamid
              Dischinger Str. 28
              89564 Nattheim, Deutschland
              E-Mail-Adresse: mohamedali2285@gmail.com
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datenschutzerklärung</Text>
          <View style={styles.contentCard}>
            <Text style={styles.privacyTitle}>Präambel</Text>
            <Text style={styles.privacyText}>
              Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend auch kurz als "Daten" bezeichnet) wir zu welchen Zwecken und in welchem Umfang im Rahmen der Bereitstellung unserer Applikation verarbeiten.
              Die verwendeten Begriffe sind nicht geschlechtsspezifisch.
              Stand: 11. September 2025
            </Text>

            <Text style={styles.privacySubtitle}>Inhaltsübersicht</Text>
            <Text style={styles.privacyText}>
              • Präambel
              • Verantwortlicher
              • Übersicht der Verarbeitungen
              • Maßgebliche Rechtsgrundlagen
              • Sicherheitsmaßnahmen
              • Übermittlung von personenbezogenen Daten
              • Internationale Datentransfers
              • Allgemeine Informationen zur Datenspeicherung und Löschung
              • Rechte der betroffenen Personen
              • Bereitstellung des Onlineangebots und Webhosting
              • Einsatz von Cookies
              • Kontakt- und Anfrageverwaltung
              • Onlinemarketing
            </Text>

            <Text style={styles.privacySubtitle}>Verantwortlicher</Text>
            <Text style={styles.privacyText}>
              Mohamed Abdelhamid
              Dischinger Str. 28
              89564 Nattheim, Deutschland
              E-Mail-Adresse: mohamedali2285@gmail.com
            </Text>

            <Text style={styles.privacySubtitle}>Übersicht der Verarbeitungen</Text>
            <Text style={styles.privacyText}>
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.
            </Text>
            <Text style={styles.privacySubSectionTitle}>Arten der verarbeiteten Daten</Text>
            <Text style={styles.privacyText}>
              • Bestandsdaten.
              • Kontaktdaten.
              • Inhaltsdaten.
              • Nutzungsdaten.
              • Meta-, Kommunikations- und Verfahrensdaten.
              • Protokolldaten.
            </Text>
            <Text style={styles.privacySubSectionTitle}>Kategorien betroffener Personen</Text>
            <Text style={styles.privacyText}>
              • Kommunikationspartner.
              • Nutzer.
            </Text>
            <Text style={styles.privacySubSectionTitle}>Zwecke der Verarbeitung</Text>
            <Text style={styles.privacyText}>
              • Kommunikation.
              • Sicherheitsmaßnahmen.
              • Reichweitenmessung.
              • Tracking.
              • Konversionsmessung.
              • Zielgruppenbildung.
              • Organisations- und Verwaltungsverfahren.
              • Feedback.
              • Marketing.
              • Profile mit nutzerbezogenen Informationen.
              • Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
              • Informationstechnische Infrastruktur.
            </Text>

            <Text style={styles.privacySubtitle}>Maßgebliche Rechtsgrundlagen</Text>
            <Text style={styles.privacyText}>
              Maßgebliche Rechtsgrundlagen nach der DSGVO: Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung mit.
              • Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO) - Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
              • Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO) - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.
              • Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO) - die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten verlangen, nicht überwiegen.
              Nationale Datenschutzregelungen in Deutschland: Zusätzlich zu den Datenschutzregelungen der DSGVO gelten nationale Datenschutzvorgaben in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.
              Hinweis auf Geltung DSGVO und Schweizer DSG: Diese Datenschutzhinweise dienen sowohl der Informationserteilung nach dem Schweizer DSG als auch nach der Datenschutzgrundverordnung (DSGVO). Aus diesem Grund bitten wir Sie zu beachten, dass aufgrund der breiteren räumlichen Anwendung und Verständlichkeit die Begriffe der DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG verwendeten Begriffe „Bearbeitung" von „Personendaten", "überwiegendes Interesse" und "besonders schützenswerte Personendaten" werden die in der DSGVO verwendeten Begriffe „Verarbeitung" von „personenbezogenen Daten" sowie "berechtigtes Interesse" und "besondere Kategorien von Daten" verwendet. Die gesetzliche Bedeutung der Begriffe wird jedoch im Rahmen der Geltung des Schweizer DSG weiterhin nach dem Schweizer DSG bestimmt.
            </Text>

            <Text style={styles.privacySubtitle}>Sicherheitsmaßnahmen</Text>
            <Text style={styles.privacyText}>
              Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
              Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
            </Text>

            <Text style={styles.privacySubtitle}>Übermittlung von personenbezogenen Daten</Text>
            <Text style={styles.privacyText}>
              Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt beziehungsweise ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister gehören oder Anbieter von Diensten und Inhalten, die in eine Website eingebunden sind. In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.
            </Text>

            <Text style={styles.privacySubtitle}>Internationale Datentransfers</Text>
            <Text style={styles.privacyText}>
              Datenverarbeitung in Drittländern: Sofern wir Daten in ein Drittland (d. h. außerhalb der Europäischen Union (EU) oder des Europäischen Wirtschaftsraums (EWR)) übermitteln oder dies im Rahmen der Nutzung von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen geschieht (was erkennbar wird anhand der Postadresse des jeweiligen Anbieters oder wenn in der Datenschutzerklärung ausdrücklich auf den Datentransfer in Drittländer hingewiesen wird), erfolgt dies stets im Einklang mit den gesetzlichen Vorgaben.
              Für Datenübermittlungen in die USA stützen wir uns vorrangig auf das Data Privacy Framework (DPF), welches durch einen Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 als sicherer Rechtsrahmen anerkannt wurde. Zusätzlich haben wir mit den jeweiligen Anbietern Standardvertragsklauseln abgeschlossen, die den Vorgaben der EU-Kommission entsprechen und vertragliche Verpflichtungen zum Schutz Ihrer Daten festlegen.
              Diese zweifache Absicherung gewährleistet einen umfassenden Schutz Ihrer Daten: Das DPF bildet die primäre Schutzebene, während die Standardvertragsklauseln als zusätzliche Sicherheit dienen. Sollten sich Änderungen im Rahmen des DPF ergeben, greifen die Standardvertragsklauseln als zuverlässige Rückfalloption ein. So stellen wir sicher, dass Ihre Daten auch bei etwaigen politischen oder rechtlichen Veränderungen stets angemessen geschützt bleiben.
              Bei den einzelnen Diensteanbietern informieren wir Sie darüber, ob sie nach dem DPF zertifiziert sind und ob Standardvertragsklauseln vorliegen. Weitere Informationen zum DPF und eine Liste der zertifizierten Unternehmen finden Sie auf der Website des US-Handelsministeriums unter https://www.dataprivacyframework.gov/ (in englischer Sprache).
              Für Datenübermittlungen in andere Drittländer gelten entsprechende Sicherheitsmaßnahmen, insbesondere Standardvertragsklauseln, ausdrückliche Einwilligungen oder gesetzlich erforderliche Übermittlungen. Informationen zu Drittlandtransfers und geltenden Angemessenheitsbeschlüssen können Sie dem Informationsangebot der EU-Kommission entnehmen: https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de.
            </Text>

            <Text style={styles.privacySubtitle}>Allgemeine Informationen zur Datenspeicherung und Löschung</Text>
            <Text style={styles.privacyText}>
              Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen Bestimmungen, sobald die zugrundeliegenden Einwilligungen widerrufen werden oder keine weiteren rechtlichen Grundlagen für die Verarbeitung bestehen. Dies betrifft Fälle, in denen der ursprüngliche Verarbeitungszweck entfällt oder die Daten nicht mehr benötigt werden. Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder besondere Interessen eine längere Aufbewahrung oder Archivierung der Daten erfordern.
              Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren Speicherung notwendig ist zur Rechtsverfolgung oder zum Schutz der Rechte anderer natürlicher oder juristischer Personen, entsprechend archiviert werden.
              Unsere Datenschutzhinweise enthalten zusätzliche Informationen zur Aufbewahrung und Löschung von Daten, die speziell für bestimmte Verarbeitungsprozesse gelten.
              Bei mehreren Angaben zur Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist stets die längste Frist maßgeblich. Daten, die nicht mehr für den ursprünglich vorgesehenen Zweck, sondern aufgrund gesetzlicher Vorgaben oder anderer Gründe aufbewahrt werden, verarbeiten wir ausschließlich zu den Gründen, die ihre Aufbewahrung rechtfertigen.
              Aufbewahrung und Löschung von Daten: Die folgenden allgemeinen Fristen gelten für die Aufbewahrung und Archivierung nach deutschem Recht:
              •	10 Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte, Eröffnungsbilanz sowie die zu ihrem Verständnis erforderlichen Arbeitsanweisungen und sonstigen Organisationsunterlagen (§ 147 Abs. 1 Nr. 1 i.V.m. Abs. 3 AO, § 14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1 i.V.m. Abs. 4 HGB).
              •	8 Jahre - Buchungsbelege, wie z. B. Rechnungen und Kostenbelege (§ 147 Abs. 1 Nr. 4 und 4a i.V.m. Abs. 3 Satz 1 AO sowie § 257 Abs. 1 Nr. 4 i.V.m. Abs. 4 HGB).
              •	6 Jahre - Übrige Geschäftsunterlagen: empfangene Handels- oder Geschäftsbriefe, Wiedergaben der abgesandten Handels- oder Geschäftsbriefe, sonstige Unterlagen, soweit sie für die Besteuerung von Bedeutung sind, z. B. Stundenlohnzettel, Betriebsabrechnungsbögen, Kalkulationsunterlagen, Preisauszeichnungen, aber auch Lohnabrechnungsunterlagen, soweit sie nicht bereits Buchungsbelege sind und Kassenstreifen (§ 147 Abs. 1 Nr. 2, 3, 5 i.V.m. Abs. 3 AO, § 257 Abs. 1 Nr. 2 u. 3 i.V.m. Abs. 4 HGB).
              •	3 Jahre - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und Schadensersatzansprüche oder ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen sowie damit verbundene Anfragen zu bearbeiten, basierend auf früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die Dauer der regulären gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 195, 199 BGB).
            </Text>

            <Text style={styles.privacySubtitle}>Rechte der betroffenen Personen</Text>
            <Text style={styles.privacyText}>
              Rechte der betroffenen Personen aus der DSGVO: Ihnen stehen als Betroffenen nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
              •	Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.
              •	Widerrufsrecht bei Einwilligungen: Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.
              •	Auskunftsrecht: Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
              •	Recht auf Berichtigung: Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
              •	Recht auf Löschung und Einschränkung der Verarbeitung: Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.
              •	Recht auf Datenübertragbarkeit: Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.
              •	Beschwerde bei Aufsichtsbehörde: Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.
            </Text>

            <Text style={styles.privacySubtitle}>Bereitstellung des Onlineangebots und Webhosting</Text>
            <Text style={styles.privacyText}>
              Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu können. Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und Funktionen unserer Online-Dienste an den Browser oder das Endgerät der Nutzer zu übermitteln.
              •	Verarbeitete Datenarten: Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen); Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen). Protokolldaten (z. B. Logfiles betreffend Logins oder den Abruf von Daten oder Zugriffszeiten.).
              •	Betroffene Personen: Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).
              •	Zwecke der Verarbeitung: Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit; Informationstechnische Infrastruktur (Betrieb und Bereitstellung von Informationssystemen und technischen Geräten (Computer, Server etc.)). Sicherheitsmaßnahmen.
              •	Aufbewahrung und Löschung: Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung".
              •	Rechtsgrundlagen: Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              •	Erhebung von Zugriffsdaten und Logfiles: Der Zugriff auf unser Onlineangebot wird in Form von sogenannten "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die Adresse und der Name der abgerufenen Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im Regelfall IP-Adressen und der anfragende Provider gehören. Die Serverlogfiles können zum einen zu Sicherheitszwecken eingesetzt werden, z. B. um eine Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen Angriffen, sogenannten DDoS-Attacken), und zum anderen, um die Auslastung der Server und ihre Stabilität sicherzustellen; Rechtsgrundlagen: Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). Löschung von Daten: Logfile-Informationen werden für die Dauer von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.
            </Text>

            <Text style={styles.privacySubtitle}>Einsatz von Cookies</Text>
            <Text style={styles.privacyText}>
              Unter dem Begriff „Cookies" werden Funktionen, die Informationen auf Endgeräten der Nutzer speichern und aus ihnen auslesen, verstanden. Cookies können ferner in Bezug auf unterschiedliche Anliegen Einsatz finden, etwa zu Zwecken der Funktionsfähigkeit, der Sicherheit und des Komforts von Onlineangeboten sowie der Erstellung von Analysen der Besucherströme. Wir verwenden Cookies gemäß den gesetzlichen Vorschriften. Dazu holen wir, wenn erforderlich, vorab die Zustimmung der Nutzer ein. Ist eine Zustimmung nicht notwendig, setzen wir auf unsere berechtigten Interessen. Dies gilt, wenn das Speichern und Auslesen von Informationen unerlässlich ist, um ausdrücklich angeforderte Inhalte und Funktionen bereitstellen zu können. Dazu zählen etwa die Speicherung von Einstellungen sowie die Sicherstellung der Funktionalität und Sicherheit unseres Onlineangebots. Die Einwilligung kann jederzeit widerrufen werden. Wir informieren klar über deren Umfang und welche Cookies genutzt werden.
              Hinweise zu datenschutzrechtlichen Rechtsgrundlagen: Ob wir personenbezogene Daten mithilfe von Cookies verarbeiten, hängt von einer Einwilligung ab. Liegt eine Einwilligung vor, dient sie als Rechtsgrundlage. Ohne Einwilligung stützen wir uns auf unsere berechtigten Interessen, die vorstehend in diesem Abschnitt und im Kontext der jeweiligen Dienste und Verfahren erläutert sind.
              Speicherdauer: Im Hinblick auf die Speicherdauer werden die folgenden Arten von Cookies unterschieden:
              •	Temporäre Cookies (auch: Session- oder Sitzungscookies): Temporäre Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Onlineangebot verlassen und sein Endgerät (z. B. Browser oder mobile Applikation) geschlossen hat.
              •	Permanente Cookies: Permanente Cookies bleiben auch nach dem Schließen des Endgeräts gespeichert. So können beispielsweise der Log-in-Status gespeichert und bevorzugte Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht. Ebenso können die mithilfe von Cookies erhobenen Nutzerdaten zur Reichweitenmessung Verwendung finden. Sofern wir Nutzern keine expliziten Angaben zur Art und Speicherdauer von Cookies mitteilen (z. B. im Rahmen der Einholung der Einwilligung), sollten sie davon ausgehen, dass diese permanent sind und die Speicherdauer bis zu zwei Jahre betragen kann.
              Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-out): Nutzer können die von ihnen abgegebenen Einwilligungen jederzeit widerrufen und zudem einen Widerspruch gegen die Verarbeitung entsprechend den gesetzlichen Vorgaben, auch mittels der Privatsphäre-Einstellungen ihres Browsers, erklären.
              •	Verarbeitete Datenarten: Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).
              •	Betroffene Personen: Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).
              •	Rechtsgrundlagen: Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              •	Verarbeitung von Cookie-Daten auf Grundlage einer Einwilligung: Wir setzen eine Einwilligungs-Management-Lösung ein, bei der die Einwilligung der Nutzer zur Verwendung von Cookies oder zu den im Rahmen der Einwilligungs-Management-Lösung genannten Verfahren und Anbietern eingeholt wird. Dieses Verfahren dient der Einholung, Protokollierung, Verwaltung und dem Widerruf von Einwilligungen, insbesondere bezogen auf den Einsatz von Cookies und vergleichbaren Technologien, die zur Speicherung, zum Auslesen und zur Verarbeitung von Informationen auf den Endgeräten der Nutzer eingesetzt werden. Im Rahmen dieses Verfahrens werden die Einwilligungen der Nutzer für die Nutzung von Cookies und die damit verbundenen Verarbeitungen von Informationen, einschließlich der im Einwilligungs-Management-Verfahren genannten spezifischen Verarbeitungen und Anbieter, eingeholt. Die Nutzer haben zudem die Möglichkeit, ihre Einwilligungen zu verwalten und zu widerrufen. Die Einwilligungserklärungen werden gespeichert, um eine erneute Abfrage zu vermeiden und den Nachweis der Einwilligung gemäß der gesetzlichen Anforderungen führen zu können. Die Speicherung erfolgt serverseitig und/oder in einem Cookie (sogenanntes Opt-In-Cookie) oder mittels vergleichbarer Technologien, um die Einwilligung einem spezifischen Nutzer oder dessen Gerät zuordnen zu können. Sofern keine spezifischen Angaben zu den Anbietern von Einwilligungs-Management-Diensten vorliegen, gelten folgende allgemeine Hinweise: Die Dauer der Speicherung der Einwilligung beträgt bis zu zwei Jahre. Dabei wird ein pseudonymer Nutzer-Identifikator erstellt, der zusammen mit dem Zeitpunkt der Einwilligung, den Angaben zum Umfang der Einwilligung (z. B. betreffende Kategorien von Cookies und/oder Diensteanbieter), sowie Informationen über den Browser, das System und das verwendete Endgerät gespeichert wird; Rechtsgrundlagen: Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
            </Text>

            <Text style={styles.privacySubtitle}>Kontakt- und Anfrageverwaltung</Text>
            <Text style={styles.privacyText}>
              Bei der Kontaktaufnahme mit uns (z. B. per Post, Kontaktformular, E-Mail, Telefon oder via soziale Medien) sowie im Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben der anfragenden Personen verarbeitet, soweit dies zur Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.
              •	Verarbeitete Datenarten: Bestandsdaten (z. B. der vollständige Name, Wohnadresse, Kontaktinformationen, Kundennummer, etc.); Kontaktdaten (z. B. Post- und E-Mail-Adressen oder Telefonnummern); Inhaltsdaten (z. B. textliche oder bildliche Nachrichten und Beiträge sowie die sie betreffenden Informationen, wie z. B. Angaben zur Autorenschaft oder Zeitpunkt der Erstellung); Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).
              •	Betroffene Personen: Kommunikationspartner.
              •	Zwecke der Verarbeitung: Kommunikation; Organisations- und Verwaltungsverfahren; Feedback (z. B. Sammeln von Feedback via Online-Formular). Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
              •	Aufbewahrung und Löschung: Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung".
              •	Rechtsgrundlagen: Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              •	Kontaktformular: Bei Kontaktaufnahme über unser Kontaktformular, per E-Mail oder anderen Kommunikationswegen, verarbeiten wir die uns übermittelten personenbezogenen Daten zur Beantwortung und Bearbeitung des jeweiligen Anliegens. Dies umfasst in der Regel Angaben wie Name, Kontaktinformationen und gegebenenfalls weitere Informationen, die uns mitgeteilt werden und zur angemessenen Bearbeitung erforderlich sind. Wir nutzen diese Daten ausschließlich für den angegebenen Zweck der Kontaktaufnahme und Kommunikation; Rechtsgrundlagen: Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
            </Text>

            <Text style={styles.privacySubtitle}>Onlinemarketing</Text>
            <Text style={styles.privacyText}>
              Wir verarbeiten personenbezogene Daten zum Zweck des Onlinemarketings, worunter insbesondere die Vermarktung von Werbeflächen oder die Darstellung von werbenden und sonstigen Inhalten (zusammenfassend als „Inhalte" bezeichnet) anhand potenzieller Interessen der Nutzer sowie die Messung ihrer Effektivität fallen können.
              Zu diesen Zwecken werden sogenannte Nutzerprofile angelegt und in einer Datei (der sogenannte „Cookie") gespeichert oder ähnliche Verfahren genutzt, mittels derer die für die Darstellung der vorgenannten Inhalte relevanten Angaben zum Nutzer gespeichert werden. Hierzu können beispielsweise betrachtete Inhalte, besuchte Websites, genutzte Onlinenetzwerke, aber auch Kommunikationspartner und technische Angaben gehören, wie etwa der verwendete Browser, das benutzte Computersystem sowie Auskünfte zu Nutzungszeiten und genutzte Funktionen. Sofern Nutzer in die Erhebung ihrer Standortdaten eingewilligt haben, können auch diese verarbeitet werden.
              Zudem werden die IP-Adressen der Nutzer gespeichert. Jedoch nutzen wir zur Verfügung stehende IP-Masking-Verfahren (d. h. Pseudonymisierung durch Kürzung der IP-Adresse) zum Nutzerschutz. Generell werden im Rahmen des Onlinemarketingverfahrens keine Klardaten der Nutzer (wie z. B. E-Mail-Adressen oder Namen) gespeichert, sondern Pseudonyme. Das heißt, wir als auch die Anbieter der Onlinemarketingverfahren kennen nicht die tatsächliche Nutzeridentität, sondern nur die in deren Profilen gespeicherten Angaben.
              Die Aussagen in den Profilen werden im Regelfall in den Cookies oder mittels ähnlicher Verfahren gespeichert. Diese Cookies können später generell auch auf anderen Websites, die dasselbe Onlinemarketingverfahren einsetzen, ausgelesen und zum Zweck der Darstellung von Inhalten analysiert sowie mit weiteren Daten ergänzt und auf dem Server des Onlinemarketingverfahrensanbieters gespeichert werden.
              Ausnahmsweise ist es möglich, Klardaten den Profilen zuzuordnen, vornehmlich dann, wenn die Nutzer zum Beispiel Mitglieder eines sozialen Netzwerks sind, dessen Onlinemarketingverfahren wir einsetzen und das Netzwerk die Nutzerprofile mit den vorgenannten Angaben verbindet. Wir bitten darum, zu beachten, dass Nutzer mit den Anbietern zusätzliche Abreden treffen können, etwa durch Einwilligung im Rahmen der Registrierung.
              Wir erhalten grundsätzlich nur Zugang zu zusammengefassten Informationen über den Erfolg unserer Werbeanzeigen. Jedoch können wir im Rahmen sogenannter Konversionsmessungen prüfen, welche unserer Onlinemarketingverfahren zu einer sogenannten Konversion geführt haben, d. h. beispielsweise zu einem Vertragsschluss mit uns. Die Konversionsmessung wird alleine zur Erfolgsanalyse unserer Marketingmaßnahmen verwendet.
              Solange nicht anders angegeben, bitten wir Sie, davon auszugehen, dass eingesetzte Cookies für einen Zeitraum von zwei Jahren gespeichert werden.
              Hinweise zu Rechtsgrundlagen: Sofern wir die Nutzer um deren Einwilligung in den Einsatz der Drittanbieter bitten, stellt die Rechtsgrundlage der Datenverarbeitung die Erlaubnis dar. Ansonsten werden die Daten der Nutzer auf Grundlage unserer berechtigten Interessen (d. h. Interesse an effizienten, wirtschaftlichen und empfängerfreundlichen Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die Informationen zur Verwendung von Cookies in dieser Datenschutzerklärung hinweisen.
              Hinweise zum Widerruf und Widerspruch:
              Wir verweisen auf die Datenschutzhinweise der jeweiligen Anbieter und die zu den Anbietern angegebenen Widerspruchsmöglichkeiten (sog. "Opt-Out"). Sofern keine explizite Opt-Out-Möglichkeit angegeben wurde, besteht zum einen die Möglichkeit, dass Sie Cookies in den Einstellungen Ihres Browsers abschalten. Hierdurch können jedoch Funktionen unseres Onlineangebots eingeschränkt werden. Wir empfehlen daher zusätzlich die folgenden Opt-Out-Möglichkeiten, die zusammenfassend auf jeweilige Gebiete gerichtet angeboten werden:
              a) Europa: https://www.youronlinechoices.eu.
              b) Kanada: https://www.youradchoices.ca/choices.
              c) USA: https://www.aboutads.info/choices.
              d) Gebietsübergreifend: https://optout.aboutads.info.
              •	Verarbeitete Datenarten: Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).
              •	Betroffene Personen: Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).
              •	Zwecke der Verarbeitung: Reichweitenmessung (z. B. Zugriffsstatistiken, Erkennung wiederkehrender Besucher); Tracking (z. B. interessens-/verhaltensbezogenes Profiling, Nutzung von Cookies); Zielgruppenbildung; Marketing; Profile mit nutzerbezogenen Informationen (Erstellen von Nutzerprofilen). Konversionsmessung (Messung der Effektivität von Marketingmaßnahmen).
              •	Aufbewahrung und Löschung: Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung". Speicherung von Cookies von bis zu 2 Jahren (Sofern nicht anders angegeben, können Cookies und ähnliche Speichermethoden für einen Zeitraum von zwei Jahren auf den Geräten der Nutzer gespeichert werden.).
              •	Sicherheitsmaßnahmen: IP-Masking (Pseudonymisierung der IP-Adresse).
              •	Rechtsgrundlagen: Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
              Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:
              •	Google Ads und Konversionsmessung: Online-Marketing-Verfahren zum Zwecke der Platzierung von Inhalten und Anzeigen innerhalb des Werbenetzwerks des Diensteanbieters (z. B. in Suchergebnissen, in Videos, auf Webseiten usw.), so dass sie Nutzern angezeigt werden, die ein mutmaßliches Interesse an den Anzeigen haben. Darüber hinaus messen wir die Konversion der Anzeigen, d. h. ob die Nutzer sie zum Anlass genommen haben, mit den Anzeigen zu interagieren und die beworbenen Angebote zu nutzen (sog. Konversionen). Wir erhalten jedoch nur anonyme Informationen und keine persönlichen Informationen über einzelne Nutzer; Dienstanbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland; Rechtsgrundlagen: Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO); Website: https://marketingplatform.google.com; Datenschutzerklärung: https://policies.google.com/privacy; Grundlage Drittlandtransfers: Data Privacy Framework (DPF); Weitere Informationen: Arten der Verarbeitung sowie der verarbeiteten Daten: https://business.safety.google/adsservices/. Datenverarbeitungsbedingungen zwischen Verantwortlichen und Standardvertragsklauseln für Drittlandtransfers von Daten: https://business.safety.google/adscontrollerterms.
              •	Google Adsense mit nicht-personalisierten Anzeigen: Wir nutzen den Dienst Google Adsense, um nicht-personalisierte Anzeigen in unserem Onlineangebot zu schalten. Diese Anzeigen basieren nicht auf dem individuellen Nutzerverhalten, sondern werden anhand allgemeiner Merkmale wie dem Inhalt der Seite oder Ihrer ungefähren geografischen Lage ausgewählt. Für die Einblendung oder sonstige Nutzung dieser Anzeigen erhalten wir eine Vergütung; Dienstanbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland; Rechtsgrundlagen: Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO); Website: https://marketingplatform.google.com; Datenschutzerklärung: https://policies.google.com/privacy; Grundlage Drittlandtransfers: Data Privacy Framework (DPF); Weitere Informationen: Arten der Verarbeitung sowie der verarbeiteten Daten: https://business.safety.google/adsservices/. Datenverarbeitungsbedingungen für Google Werbeprodukte: Informationen zu den Diensten Datenverarbeitungsbedingungen zwischen Verantwortlichen und Standardvertragsklauseln für Drittlandtransfers
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#757575',
    fontWeight: '500',
  },
  headerIcon: {
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 50,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
    paddingLeft: 4,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  impressumText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  privacyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 10,
  },
  privacySubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginTop: 15,
    marginBottom: 8,
  },
  privacySubSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginTop: 10,
    marginBottom: 5,
  },
  privacyText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 10,
  },
});
