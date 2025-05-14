export default function BackgroundInstructions() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 p-4 rounded-lg max-w-md text-xs text-white">
      <h3 className="font-bold mb-2">Como personalizar a página:</h3>
      <h4 className="font-semibold mt-2">Imagem de fundo:</h4>
      <ol className="list-decimal pl-4 space-y-1">
        <li>Faça o download da imagem de fundo do site Canva</li>
        <li>Renomeie a imagem para "background.jpg" ou "background.png"</li>
        <li>Coloque a imagem na pasta "public" do projeto</li>
        <li>Atualize o componente landing-page.tsx para usar "/background.jpg" como src da Image</li>
      </ol>

      <h4 className="font-semibold mt-2">Logo:</h4>
      <ol className="list-decimal pl-4 space-y-1">
        <li>Prepare seu logo com fundo transparente (formato PNG recomendado)</li>
        <li>Renomeie o arquivo para "logo.png"</li>
        <li>Coloque o logo na pasta "public" do projeto</li>
        <li>Atualize o componente landing-page.tsx para usar "/logo.png" como src da Image do logo</li>
        <li>Ajuste width e height conforme necessário para o tamanho do seu logo</li>
      </ol>
    </div>
  )
}
