
class DocPart
  # ------------------------------------------------
  # ------------------------------------------------
  attr_accessor :condition, :content
  # ------------------------------------------------
  def initialize raw=nil
    @content = ''
    @condition = 'always'
    parse(raw) if raw
  end
  # ------------------------------------------------
  def parse raw
    raw = raw[2..-1] if raw.start_with? '[['

    raw_bits = raw.split(/\]\]/, 2)
    if raw_bits.length == 2
      @condition = raw_bits[0]
      @content = raw_bits[1]
    else
      @condition = 'always'
      @content = raw_bits[0]
    end

  end
  # ------------------------------------------------
  def to_s
    '[[ ' + @condition.to_s + ' ]]: ' + @content.to_s
  end
  # ------------------------------------------------
  # ------------------------------------------------
end