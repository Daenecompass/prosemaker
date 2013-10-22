
require './lib/prosemaker/docpart.rb'

describe DocPart do
  # --------------------------------------------------
  # --------------------------------------------------
  describe '@content' do

    it 'starts blank' do
      dp = DocPart.new
      expect(dp.content).to eq('')
    end

    it 'can be set' do
      test_content = 'test content'
      dp = DocPart.new
      dp.content = test_content

      expect(dp.content).to eq(test_content)
    end
  end
  # --------------------------------------------------
  describe '@condition' do

    it 'starts as "always"' do
      dp = DocPart.new
      expect(dp.condition).to eq('always')
    end

    it 'can be set' do
      test_condition = 'test condition'
      dp = DocPart.new
      dp.condition = test_condition

      expect(dp.condition).to eq(test_condition)
    end
  end
  # --------------------------------------------------
  describe '.initialize' do
    it 'can take a raw block on init' do
      test_condition = 'a condition'
      test_content = 'some content'
      test_block = '[[' + test_condition + ']]' + test_content

      dp = DocPart.new test_block

      expect(dp.condition).to eq(test_condition)
      expect(dp.content).to eq(test_content)
    end
  end
  # --------------------------------------------------
  describe '.parse' do

    it 'can parse a no-condition block' do
      dp = DocPart.new
      test_block = 'test block'
      dp.parse test_block

      expect(dp.content).to eq(test_block)
    end

    it 'gives condition "always" to a no-condition block' do
      dp = DocPart.new
      test_block = 'test block'
      dp.parse test_block

      expect(dp.condition).to eq('always')
    end

    it 'can parse a conditional block with leading brackets' do
      test_condition = 'a condition'
      test_content = 'some content'
      test_block = '[[' + test_condition + ']]' + test_content
      dp = DocPart.new
      dp.parse test_block

      expect(dp.condition).to eq(test_condition)
      expect(dp.content).to eq(test_content)
    end

    it 'can parse a conditional block withOUT leading brackets' do
      test_condition = 'a condition'
      test_content = 'some content'
      test_block = test_condition + ']]' + test_content
      dp = DocPart.new
      dp.parse test_block

      expect(dp.condition).to eq(test_condition)
      expect(dp.content).to eq(test_content)
    end

  end
  # --------------------------------------------------
  # --------------------------------------------------

end